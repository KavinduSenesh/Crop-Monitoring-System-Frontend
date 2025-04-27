import { deleteEquipment, getAll, save, updateEquipment } from "../model/EquipmentModel.js";
import { getAllStaff } from "../model/StaffModel.js";
import { getAll as getAllFields } from "../model/FieldModel.js"

// updateDateTime();
getAllEquipments();

// document.addEventListener("DOMContentLoaded", () => {
//   const datePicker = document.querySelector(".date-time-container");
//   datePicker.addEventListener("change", (event) => {
//     const selectedDate = event.target.value;
//     console.log("Selected date:", selectedDate);
//   });
// });

function updateDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  document.querySelector(".date-time-container").innerHTML = `${date} ${time}`;
}

export function getAllEquipments() {
  getAll().then((equipments) => {
    reloadTable(equipments);
  });
}

function reloadTable(equipments) {
  let $tableBody = $("#equipment-table-body");
  console.log(equipments);

  // Clear the table body before adding new rows
  $tableBody.empty();

  $.each(equipments, function (index, equipment) {
    let $newRow = $("<tr>").appendTo($tableBody);

    // Set row data
    
    $("<td>").text(dataRefactor(equipment.equipmentId, 22)).appendTo($newRow);
    $("<td>").text(equipment.name).appendTo($newRow);
    $("<td>")
      .addClass("th-td-space")
      .text(equipment.equipmentType)
      .appendTo($newRow);
    $("<td>").addClass("th-td-space").text(equipment.status).appendTo($newRow);
    $("<td>")
      .addClass("th-td-space")
      .text(equipment.assignedStaffId)
      .appendTo($newRow);
    $("<td>")
      .addClass("th-td-space")
      .text(equipment.assignedFieldCode)
      .appendTo($newRow);
    console.log("Equipment Name : ", equipment.name);
    $newRow.on("click", function () {
      // Populate the modal with equipment details
      $("#modal-name").text(equipment.name || "N/A");
      $("#modal-equipmentType").text(equipment.equipmentType || "N/A");
      $("#modal-status").text(equipment.status || "N/A");
      $("#modal-assignedStaffId").text(equipment.assignedStaffId || "N/A");
      $("#modal-assignedFieldCode").text(equipment.assignedFieldCode || "N/A");

      // Show the modal
      $("#equipmentDetailsModal").css("display", "block");
      $("#delete-equipment-btn").on("click", function () {
        if (confirm("Are you sure want to delete this Equipment!")) {
          deleteEquipment(equipment.equipmentId).then(() => {
            alert("Equipment deleted successfully!");
            location.reload();
            
          });
        }
      });
    });

    // Close the modal
    $(".close").on("click", function () {
      $("#equipmentDetailsModal").css("display", "none");
    });

    // Optional: Close modal when clicked outside
    $(window).on("click", function (event) {
      if ($(event.target).is("#equipmentDetailsModal")) {
        $("#equipmentDetailsModal").css("display", "none");
      }
    });

    $(document).ready(function () {
      let isEditing = false;

      // Toggle editable fields when Update button is clicked
      $("#update-equipment-btn").on("click", function () {
        loadStaffIds();
        loadFieldCodes();
        $("#staffid-selector").css("display",  "flex");
        $("#modal-assignedStaffId-paragraph").css("display",  "none");

        $("#fieldcode-selector").css("display",  "flex");
        $("#modal-assignedFieldCode-paragraph").css("display",  "none");

        if (!isEditing) {
          // Enable editing
          $(".modal-body span").attr("contenteditable", "true").css({
            border: "1px dashed #007bff",
            padding: "2px",
            borderRadius: "4px",
          });
          $(this).text("Save");
          isEditing = true;
        } else {
          // Save changes and disable editing
          $(".modal-body span").attr("contenteditable", "false").css({
            border: "none",
            padding: "0",
            borderRadius: "0",
          });

          console.log("equipment id : ", equipment.equipmentId);
          // Extract updated data
          const updatedData = {
            name : $("#modal-name").text(),
            equipmentType : $("#modal-equipmentType").text(),
            status : $("#modal-status").text(),
            assignedStaffId : $("#staffid-selector").val(),
            assignedFieldCode : $("#fieldcode-selector").val(),
          };

          console.log("Updated data:", updatedData);

          updateEquipment(equipment.equipmentId, updatedData).then(() => {
            alert("Equipment Updated Successfully!");
            location.reload();
          }, error(() => {
            alert("Equipment update failed!");
          }));

          $(this).text("Update");
          isEditing = false;

          // Optionally, send updatedData to the server via an AJAX request here
          // Example AJAX call:
          // updateStaffMember(staffId, updatedData)
          //   .then((response) => console.log("Update successful:", response))
          //   .catch((error) => console.error("Update failed:", error));
        }
      });
    });
  
    
    
  });

}

function dataRefactor(data, maxLength) {
  if (data && typeof data === "string" && data.length > maxLength) {
      return data.substring(0, maxLength) + " ...";
  }
  return data;
}

// Add vehicle modal functionality
$("#add-new-equipment").on("click", () => {
  $("#add-equipment-modal").css("display", "flex");
});

$("#add-equipment-modal .add-close").on("click", () => {
  $("#add-equipment-modal").css("display", "none");
});

$(window).on("click", (event) => {
  if ($(event.target).is("#add-vehicle-modal")) {
    $("#add-equipment-modal").css("display", "none");
  }
});

$(window).on("click", (event) => {
  if ($(event.target).is("#vehicle-modal")) {
    $("#vehicle-modal").css("display", "none");
  }
});

$("#save-equipment-btn").on("click", () => {
  let equipmentName = $("#equipment-name").val();
  let equipmentType = $("#equipment-type").val();
  let equipment = {
    name: equipmentName,
    equipmentType: equipmentType,
    status : "AVAILABLE"
  };

  save(equipment)
    .then((resolve) => {
      alert("Equipment saved successfully!");
      // console.log("Save successful:", response);
      location.reload();
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

function loadFieldCodes() {
  const fieldDropDown = $("#modal-fieldCode"); // Use jQuery to select the dropdown

  getAllFields().then((fields) => {
    // Clear the dropdown and set the default option
    fieldDropDown.empty(); // Clear existing options
    fieldDropDown.append('<option value="" disabled selected>Select Staff</option>');

    // Add options dynamically
    fields.forEach((field) => {
      const option = `<option value="${dataRefactor(field.fieldCode, 2)}">${dataRefactor(field.fieldCode, 25)} - ${field.fieldName}</option>`;
      fieldDropDown.append(option); // Append the option using jQuery
    });
  }).catch((error) => {
    console.error("Error loading staff data:", error);
  });
}
