import {
  deleteCrop,
  getAll,
  saveCrop,
  updateCrop,
} from "../model/CropModel.js";
import { checkAccess } from "../util/AccessCotroller.js";

updateDateTime();
setInterval(updateDateTime, 1000);
getAllCrops();

// Function to update date and time
function updateDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  $(".date-time-container").text(`${date} ${time}`);
}

// Handle form submission
$("#add-crop-form").on("submit", function (event) {
  event.preventDefault(); // Prevent the form from refreshing the page
  save(); // Call the save function
});

$("#crop-modal").on("submit", function (event) {
  event.preventDefault(); // Prevent the form from refreshing the page
});

let cropCode;

$("#delete-btn").on("click", function () {
  console.log("Crop Code : " + cropCode);
  deleteCropWithCropCode(cropCode);
  // Call getAllCrops and use .then() to handle the promise
  getAllCrops()
    .then(() => {
      // Reload the page
      location.reload(); // Reload the page after the deletion
    })
    .catch((error) => {
      // Handle any errors that occur while refreshing the crops list
      console.error("Error refreshing crops list:", error);
    });
});

// File input event listener
let cropImage;
$("#file-input").on("change", function () {
  cropImage = this.files[0];
});

// Save function
function save() {
  const formData = new FormData();
  formData.append("cropCommonName", $("#crop-name").val());
  formData.append("cropScientificName", $("#crop-scientific-name").val());
  formData.append("cropCategory", $("#crop-category").val());
  formData.append("cropSeason", $("#crop-season").val());
  formData.append("fieldCode", $("#crop-field").val());
  formData.append("cropImage", cropImage);

  console.log("FormData:", formData);
  saveCrop(formData).then(() => {
    location.reload();
    getAllCrops();
  });
}

// Fetch and display all crops
export function getAllCrops() {
  getAll()
    .then((crops) => {
      console.log(crops);

      if (Array.isArray(crops)) {
        crops.forEach((crop) => {
          const newCard = `
            <div class="card" style="width: 18rem; background-color: #b7f6b271" data-crop='${JSON.stringify(
              crop
            )}'>
              <img class="card-img-top" src="${base64ToImageURL(
                crop.cropImage
              )}" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title">${crop.cropCommonName}</h5>
                <p class="card-text">(${crop.cropScientificName})</p>
                <p class="crop-field">Field Code: ${crop.fieldCode}</p>
              </div>
            </div>`;
          $("#card-container").append(newCard);
        });

        // Add click event listeners to the cards
        $(".card").on("click", function () {
          const crop = JSON.parse($(this).attr("data-crop"));
          openModal(crop);
        });
      } else {
        console.error("Expected an array but got:", crops);
      }
    })
    .catch((error) => {
      console.error("Error fetching crops:", error);
    });
}

// Open modal with crop details
function openModal(crop) {
  cropCode = crop.cropCode;
  $("#modal-img").attr("src", base64ToImageURL(crop.cropImage));
  $("#modal-title").text(crop.cropCommonName);
  $("#modal-text").text(`Scientific Name: ${crop.cropScientificName}`);
  $("#modal-field").text(`Field Code: ${crop.fieldCode}`);
  $("#modal-crop-category").text(`Category: ${crop.category}`);
  $("#modal-crop-season").text(`Crop Season: ${crop.cropSeason}`);
  $("#crop-modal").fadeIn();
}

// Close modal
$(".close").on("click", function () {
  $("#crop-modal").fadeOut();
});

$(window).on("click", function (event) {
  if ($(event.target).is("#crop-modal")) {
    $("#crop-modal").fadeOut();
  }
});

// Helper function to convert base64 to image URL
function base64ToImageURL(base64Data) {
  return `data:image/png;base64,${base64Data}`;
}

// Delete crop
function deleteCropWithCropCode(cropCode) {
  if (confirm("Are you sure you want to delete this crop?")) {
    deleteCrop(cropCode)
      .then((message) => {
        console.log(message);
        location.reload();
        getAllCrops();
      })
      .catch((error) => {
        console.error("Crop deletion failed:", error);
      });
  } else {
    console.log("Crop deletion canceled");
  }
}

// // Update modal content
// $("#update-btn").on("click", function () {
//   const makeEditable = (selector) => {
//     const $element = $(selector);
//     const [staticText, editableText] = $element.text().split(":");
//     $element.html(
//       `${staticText}: <input type="text" value="${editableText?.trim()}" class="form-control">`
//     );
//   };

//   $(".custom-file-input").css("display", "flex");

//   makeEditable("#modal-text");
//   makeEditable("#modal-field");
//   makeEditable("#modal-crop-season");
//   makeEditable("#modal-crop-category");

//   $(this).text("Save").attr("id", "save-btn");
//   $("#save-btn").on("click", saveUpdates);
// });

// // Save updates
// function saveUpdates() {
//   console.log($("#modal-text input")); // Should log the element
//   console.log($("#modal-field input")); // Should log the input element
//   console.log($("#modal-crop-season input")); // Should log the input element
//   console.log($("#modal-crop-category input")); // Should log the input element

//   const updatedText = $("#modal-text").text();
//   const updatedField = $("#modal-field input").val();
//   const updatedCropSeason = $("#modal-crop-season input").val();
//   const updatedCropCategory = $("#modal-crop-category input").val();

//   console.log("Updated Text : ", updatedText);

//   const formData = new FormData();
//   formData.append("cropScientificName", updatedText);
//   formData.append("cropCategory", updatedCropCategory);
//   formData.append("cropSeason", updatedCropSeason);
//   formData.append("fieldCode", updatedField);
//   formData.append("cropImage", cropImage);

//   console.log("Form Data : " + formData.cropCategory);
//   updateCrop(cropCode, formData);

//   $("#modal-text").text(`Scientific Name: ${updatedText}`);
//   $("#modal-field").text(`Field Code: ${updatedField}`);
//   $("#modal-crop-season").text(`Crop Season: ${updatedCropSeason}`);
//   $("#modal-crop-category").text(`Crop Category: ${updatedCropCategory}`);

//   $("#save-btn").text("Update").attr("id", "update-btn");
// }

$(document).ready(function () {
  // Update button click handler
  $("#update-btn").on("click", function () {
    const updatedTitle = $("#modal-title").text();
    const updatedText = $("#modal-text").text();
    const updatedField = $("#modal-field").text();
    const updatedCropSeason = $("#modal-crop-season").text();
    const updatedCropCategory = $("#modal-crop-category").text();

    // Log the updated values
    console.log("Updated Title:", updatedTitle);
    console.log("Updated Text:", updatedText);
    console.log("Updated Field:", updatedField);
    console.log("Updated Crop Season:", updatedCropSeason);
    console.log("Updated Crop Category:", updatedCropCategory);

    // Perform additional actions with the updated data
    // e.g., Send the updated data to the server via an API
  });
});


// Add crop modal functionality
$("#add-crop-btn").on("click", () => {
  $("#add-crop-modal").css("display", "flex");
});

$("#add-crop-modal .close").on("click", () => {
  $("#add-crop-modal").css("display", "none");
});

$(window).on("click", (event) => {
  if ($(event.target).is("#add-crop-modal")) {
    $("#add-crop-modal").css("display", "none");
  }
});

$("#logout-btn").on("click", () => {
  if(confirm("Are you sure want to LogOut?")){
    window.location = "manager/loginpage.html"; 
  }
});
