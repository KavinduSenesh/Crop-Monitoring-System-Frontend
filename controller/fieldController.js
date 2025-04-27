import { deleteField, getAll, saveField} from "../model/FieldModel.js";

// updateDateTime();
// setInterval(updateDateTime, 1000);
getAllFields();

function updateDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  document.querySelector(".date-time-container").innerHTML = `${date} ${time}`;
}

// Handle form submission
$("#fieldForm").on("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  // Retrieve field values
  const fieldName = $("#fieldName").val();
  const fieldLocationLatitude = $("#fieldLocationLatitude").val();
  const fieldLocationLongitude = $("#fieldLocationLongitude").val();
  const fieldSize = $("#fieldSize").val();
  const fieldImage1 = $("#fieldImage1")[0].files[0];
  const fieldImage2 = $("#fieldImage2")[0].files[0];

  // Create FormData object to store and send data
  const formData = new FormData();
  formData.append("fieldName", fieldName);
  formData.append("latitude", fieldLocationLatitude);
  formData.append("longitude", fieldLocationLongitude);
  formData.append("fieldSize", fieldSize);
  if (fieldImage1) formData.append("image1", fieldImage1);
  if (fieldImage2) formData.append("image2", fieldImage2);

  save(formData)
    .then((response) => {
      console.log("Data sent successfully:", response.data);
      alert("Field data submitted successfully!");
    })
    .catch((error) => {
      console.error("Error submitting data:", error);
      alert("Failed to submit field data.");
    });
});

// Fetch and display all fields
function getAllFields() {
  getAll()
    .then((fields) => {
      console.log(fields);

      if (Array.isArray(fields)) {
        fields.forEach((field) => {
          const newCard = `
            <div class="card" style="width: 18rem; background-color: #b7f6b271" data-field='${JSON.stringify(
              field
            )}'>
              <img class="card-img-top" src="${base64ToImageURL(
                field.image1
              )}" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title">${field.fieldName}</h5>
                <p class="card-text">(${field.fieldSize})</p>
                <p class="crop-field">Field Code: ${field.fieldCode}</p>
                
              </div>
            </div>`;
          $("#card-container").append(newCard);
        });

        // Add click event listeners to the cards
        $(".card").on("click", function () {
          const field = JSON.parse($(this).attr("data-field"));
          openModal(field);
        });
      } else {
        console.error("Expected an array but got:", fields);
      }
    })
    .catch((error) => {
      console.error("Error fetching crops:", error);
    });
}

// Helper function to convert base64 to image URL
function base64ToImageURL(base64Data) {
  return `data:image/png;base64,${base64Data}`;
}

function openModal(field) {
  // Set modal content dynamically
  $("#modalTitle").text(`Details of ${field.fieldName}`);
  $("#modalFieldName").text(field.fieldName);
  $("#modalFieldSize").text(field.fieldSize);
  let staff = field.staffIds;
  if(staff)
  $("#staff").text(field.staffIds);

  // Set the images in the carousel
  $("#modalImage1").attr("src", base64ToImageURL(field.image1));
  $("#modalImage2").attr("src", base64ToImageURL(field.image2)); // Assuming field.image2 exists

  // Show the modal
  $("#fieldModal").modal("show");

  $(".btn-danger").on("click", () => {
    if (confirm("Are you sure you want to delete this field?")) {
      console.log("Field deletion confirmed.");
      deleteField(field.fieldCode);
      alert("Field Deleted..");
      location.reload();
    } else {
      console.log("Field deletion canceled.");
    }
    
  })

}

// Close modal
$(document).on("click", ".btn-close, [data-dismiss='modal']", function () {
  location.reload();
  $("#fieldModal").fadeOut();
  $(".btn-close").text = "Update";
});

$(document).on("click", ".btn-primary", function () {
  const updateBtn = $(this);

  // Check if the button is in "Update" mode
  if (updateBtn.text() === "Update") {
    // Change <p> tags into <input> fields
    const fieldName = $("#modalFieldName").text();
    const fieldSize = $("#modalFieldSize").text();
    const fieldCode = $("#modalFieldCode").text();

    $("#modalFieldName").replaceWith(
      `<input id="modalFieldNameInput" class="form-control" value="${fieldName}">`
    );
    $("#modalFieldSize").replaceWith(
      `<input id="modalFieldSizeInput" class="form-control" value="${fieldSize}">`
    );
    // $("#modalFieldCode").replaceWith(`<input id="modalFieldCodeInput" class="form-control" value="${fieldCode}">`);

    // Change button text to "Save"
    updateBtn.text("Save");
  } else if (updateBtn.text() === "Save") {
    // Save changes and revert <input> fields to <p> tags
    const updatedFieldName = $("#modalFieldNameInput").val();
    const updatedFieldSize = $("#modalFieldSizeInput").val();
    const updatedFieldCode = $("#modalFieldCodeInput").val();

    $("#modalFieldNameInput").replaceWith(
      `<span id="modalFieldName">${updatedFieldName}</span>`
    );
    $("#modalFieldSizeInput").replaceWith(
      `<span id="modalFieldSize">${updatedFieldSize}</span>`
    );
    $("#modalFieldCodeInput").replaceWith(
      `<span id="modalFieldCode">${updatedFieldCode}</span>`
    );

    // Change button text back to "Update"
    updateBtn.text("Update");

    // Optional: Handle save functionality (e.g., make an API call to save the updated data)
    console.log("Updated Data:", {
      fieldName: updatedFieldName,
      fieldSize: updatedFieldSize,
      fieldCode: updatedFieldCode,
    });

  }
});

$("#add-new-field-btn").on("click", function () {
  $("#add-field-modal").css("display", "flex");
  loadMap();
});

$("#add-field-modal .close").on("click", () => {
  $("#add-field-modal").css("display", "none");
});

$(window).on("click", (event) => {
  if ($(event.target).is("#add-field-modal")) {
    $("#add-field-modal").css("display", "none");
  }
});

function loadMap() {
  let map;
  let marker;
  const defaultLocation = { lat: 6.0367, lng: 80.217 }; // Galle

  function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: defaultLocation,
      zoom: 13,
    });

    marker = new google.maps.Marker({
      position: defaultLocation,
      map: map,
    });

    map.addListener("click", (event) => {
      const clickedLocation = event.latLng;

      if (marker) marker.setMap(null);

      marker = new google.maps.Marker({
        position: clickedLocation,
        map: map,
      });
      longitude = clickedLocation.lng();
      latitude = clickedLocation.lat();
      alert(
        `Latitude: ${clickedLocation.lat()}, Longitude: ${clickedLocation.lng()}`
      );
    });
  }

  initMap();
}
var longitude;
var latitude;

let fieldImage1;
let fieldImage2;

$("#file-input-1").on("change", function () {
  fieldImage1 = this.files[0];
});

$("#file-input-2").on("change", function () {
  fieldImage2 = this.files[0];
});

$("#save-field-btn").on("click", (event) => {
  event.preventDefault();
  console.log("bdu enwaa");
  let fieldName = $("#field-name").val();
  let fieldSize = $("#field-size").val();

  const formData = new FormData();
  formData.append("fieldName", fieldName);
  formData.append("fieldSize", fieldSize);
  formData.append("latitude", latitude);
  formData.append("longitude", longitude);
  formData.append("image1", fieldImage1);
  formData.append("image2", fieldImage2);

  saveField(formData).then(() => {
      alert("Field saved successfully!");
      location.reload();
  });
});

$("#logout-btn").on("click", () => {
  if(confirm("Are you sure want to LogOut?")){
    window.location = "manager/loginpage.html"; 
  }
});


