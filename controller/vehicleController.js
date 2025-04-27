import {
  deleteVehicle,
  getAll,
  save,
  updateVehicle,
} from "../model/VehicleModel.js";

import { getAllStaff} from "../model/StaffModel.js"

// updateDateTime();
getAllVehicles();

document.addEventListener("DOMContentLoaded", () => {
  const datePicker = document.querySelector(".date-time-container");
  datePicker.addEventListener("change", (event) => {
    const selectedDate = event.target.value;
    console.log("Selected date:", selectedDate);
  });
});

function updateDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  document.querySelector(".date-time-container").innerHTML = `${date} ${time}`;
}

export function getAllVehicles() {
  getAll().then((vehicles) => {
    reloadTable(vehicles);
  });
}

function reloadTable(vehicles) {
  let $tableBody = $("#staff-table-body");
  console.log(vehicles);

  // Clear the table body before adding new rows
  $tableBody.empty();

  $.each(vehicles, function (index, vehicle) {
    let $newRow = $("<tr>").appendTo($tableBody);

    // Set row data
    $("<td>").text(dataRefactor(vehicle.vehicleCode, 22)).appendTo($newRow);
    $("<td>").text(vehicle.licensePlateNumber).appendTo($newRow);
    $("<td>")
      .addClass("th-td-space")
      .text(vehicle.vehicleCategory)
      .appendTo($newRow);
    $("<td>").addClass("th-td-space").text(vehicle.fuelType).appendTo($newRow);
    if(vehicle.status === ""){
      vehicle.status = "N/A";
    }
    $("<td>").addClass("th-td-space").text(vehicle.status).appendTo($newRow);
    $("<td>").addClass("th-td-space").text(vehicle.remarks).appendTo($newRow);
    $("<td>").addClass("th-td-space").text(vehicle.staffId).appendTo($newRow);

    $newRow.on("click", function () {
      console.log(`Row clicked for field: ${vehicle.licensePlateNumber}`);
      loadStaffIds();

      // Populate the modal with vehicle details
      $("#modal-licensePlateNumber").text(vehicle.licensePlateNumber || "N/A");
      $("#modal-vehicleCategory").text(vehicle.vehicleCategory || "N/A");
      $("#modal-fuelType").text(vehicle.fuelType || "N/A");
      $("#modal-status").text(vehicle.status || "N/A");
      $("#modal-remarks").text(vehicle.remarks || "N/A");
      $("#modal-staffId").text(vehicle.staffId || "N/A");

      // Show the modal
      $("#vehicleDetailsModal").css("display", "block");

      $("#delete-vehicle-btn").on("click", () => {
        if (confirm("Are you sure want to remove this vehicle?")) {
          deleteVehicle(vehicle.vehicleCode).then(() => {
            alert("Vehicle deleted successfully!");
            location.reload();
          });
        }
      });

      // Global flag to track editing state
      let isEditing = false;

      // Toggle editable fields when Update button is clicked for Vehicle details
      $("#update-vehicle-btn").on("click", function () {
        if (!isEditing) {
          // Enable editing
          $(".modal-body span").attr("contenteditable", "true").css({
            border: "1px dashed #007bff",
            padding: "2px",
            borderRadius: "4px",
          });
          $("#modal-licensePlateNumber").attr("contenteditable", "false");
          $("#modal-vehicleCategory").attr("contenteditable", "false");
          $("#modal-fuelType").attr("contenteditable", "false");
          $(this).text("Save");
          isEditing = true;
        } else {
          // Save changes and disable editing
          $(".modal-body span").attr("contenteditable", "false").css({
            border: "none",
            padding: "0",
            borderRadius: "0",
          });

          // Extract updated data from modal
          const updatedData = {
            licensePlateNumber: $("#modal-licensePlateNumber").text(),
            vehicleCategory: $("#modal-vehicleCategory").text(),
            fuelType: $("#modal-fuelType").text(),
            status: $("#modal-status").text(),
            remarks: $("#modal-remarks").text(),
            staffId: $("#modal-staffId").text(),
          };

          console.log("Updated vehicle data:", updatedData);
          console.log("Vehicle Code : " + vehicle.vehicleCode);
          // Call the function to update vehicle data
          updateVehicle(vehicle.vehicleCode, updatedData).then(() => {
            alert("Vehicle details updated successfully!");
            location.reload(); // Optionally reload the page to reflect changes
          }).catch(() => {
            alert("Vehicle update failed!");
          })

          $(this).text("Update");
          isEditing = false;
        }
      });
    });
  });

  

  // Close the modal
  $(".close").on("click", function () {
    $("#vehicleDetailsModal").css("display", "none");
  });
}

// Add vehicle modal functionality
$("#add-new-vehicle").on("click", () => {
  $("#add-vehicle-modal").css("display", "flex");
});

$("#add-new-vehicle .close").on("click", () => {
  $("#add-vehicle-modal").css("display", "none");
});

$(window).on("click", (event) => {
  if ($(event.target).is("#add-vehicle-modal")) {
    $("#add-vehicle-modal").css("display", "none");
  }
});

$(".close").on("click", function () {
  $("#add-vehicle-modal").css("display", "none");
});

$(window).on("click", (event) => {
  if ($(event.target).is("#vehicle-modal")) {
    $("#vehicle-modal").css("display", "none");
  }
});

$("#save-vehicle-btn").on("click", (event) => {
  event.preventDefault();
  let licenseNumber = $("#license-plate-number").val();
  let category = $("#vehicle-category").val();
  let fuelType = $("#fuel-type").val();
  let status = "AVALABLE"
  let remarks = $("#remarks").val();

  console.log(licenseNumber);

  let vehicle = {
    licensePlateNumber: licenseNumber,
    vehicleCategory : category,
    fuelType : fuelType,
    status : status,
    remarks : remarks,
  };
  save(vehicle)
    .then((response) => {
      alert("Vehicle Saved successfully!");
      location.reload();
      console.log("Save successful:", response);
    })
    .catch((error) => {
      console.error(error);
    });
});

$("#logout-btn").on("click", () => {
  if(confirm("Are you sure want to LogOut?")){
    window.location = "manager/loginpage.html"; 
  }
});

function dataRefactor(data, maxLength) {
  if (data && typeof data === "string" && data.length > maxLength) {
      return data.substring(0, maxLength) + " ...";
  }
  return data;
}

function loadStaffIds() {
  const staffDropdown = $("#modal-staffId"); // Use jQuery to select the dropdown

  getAllStaff().then((staff) => {
    // Clear the dropdown and set the default option
    staffDropdown.empty(); // Clear existing options
    staffDropdown.append('<option value="" disabled selected>Select Staff</option>');

    // Add options dynamically
    staff.forEach((staffMember) => {
      const option = `<option value="${dataRefactor(staffMember.id, 2)}">${dataRefactor(staffMember.id, 25)} - ${staffMember.firstName}</option>`;
      staffDropdown.append(option); // Append the option using jQuery
    });
  }).catch((error) => {
    console.error("Error loading staff data:", error);
  });
}

