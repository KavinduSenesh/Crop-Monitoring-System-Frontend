import {
  deleteStaffMember,
  getAllStaff,
  saveStaffMember,
  updateStaffMember,
} from "../model/StaffModel.js";
import { checkAccess } from "../util/AccessCotroller.js";


getAllStaffMembers();

function updateDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  document.querySelector(".date-time-container").innerHTML = `${date} ${time}`;
}

// const datePicker = document.getElementById('datePicker');
// datePicker.addEventListener('change', (event) => {
//   const selectedDate = event.target.value;
//   console.log('Selected date:', selectedDate);
// });

export function getAllStaffMembers() {
  getAllStaff().then((staff) => {
    reloadTable(staff);
  });
}

function reloadTable(staff) {
  let $tableBody = $("#staff-table-body");
  console.log(staff);

  // Clear the table body before adding new rows
  $tableBody.empty();

  $.each(staff, function (index, staffMember) {
    let $newRow = $("<tr>").appendTo($tableBody);

    // Set row data
    $("<td>").text(staffMember.firstName).appendTo($newRow);
    $("<td>").text(staffMember.lastName).appendTo($newRow);
    $("<td>")
      .addClass("th-td-space")
      .text(staffMember.designation)
      .appendTo($newRow);
    $("<td>")
      .addClass("th-td-space")
      .text(staffMember.gender)
      .appendTo($newRow);

    const joinedDate = new Date(staffMember.DOB).toISOString().split("T")[0];
    $("<td>").addClass("th-td-space").text(joinedDate).appendTo($newRow);

    const dob = new Date(staffMember.DOB).toISOString().split("T")[0];
    $("<td>").addClass("th-td-space").text(dob).appendTo($newRow);

    const address =
      staffMember.addressLine1 +
      staffMember.addressLine2 +
      staffMember.addressLine3 +
      staffMember.addressLine4 +
      staffMember.addressLine5;
    // $("<td>").addClass("th-td-space").text(address).appendTo($newRow);

    $("<td>")
      .addClass("th-td-space")
      .text(staffMember.contactNo)
      .appendTo($newRow);
    $("<td>").addClass("th-td-space").text(staffMember.email).appendTo($newRow);
    $("<td>").addClass("th-td-space").text(staffMember.role).appendTo($newRow);

    // Attach a click event handler to show the modal when the row is clicked
    $newRow.on("click", function () {
      console.log(`Row clicked for staff: ${staffMember.firstName}`);

      // Get data from the clicked row
      const firstName = $(this).find("td:nth-child(1)").text();
      const lastName = $(this).find("td:nth-child(2)").text();
      const designation = $(this).find("td:nth-child(3)").text();
      const gender = $(this).find("td:nth-child(4)").text();
      const joinedDate = $(this).find("td:nth-child(5)").text();
      const dob = $(this).find("td:nth-child(6)").text();
      const contactNo = $(this).find("td:nth-child(7)").text();
      const email = $(this).find("td:nth-child(8)").text();
      const role = $(this).find("td:nth-child(9)").text();

      // Concatenate address fields if needed (adapt as per your logic)
      const address =
        staffMember.addressLine1 +
        "," +
        staffMember.addressLine2 +
        ", " +
        staffMember.addressLine3 +
        "," +
        staffMember.addressLine4 +
        "," +
        staffMember.addressLine5; // Replace with actual address logic

      // Populate the modal fields
      $("#modal-firstName").text(firstName);
      $("#modal-lastName").text(lastName);
      $("#modal-designation").text(designation);
      $("#modal-gender").text(gender);
      $("#modal-joinedDate").text(joinedDate);
      $("#modal-dob").text(dob);
      $("#modal-address").text(address);
      $("#modal-contactNo").text(contactNo);
      $("#modal-email").text(email);
      $("#modal-role").text(role);

      // Show the modal
      $("#staffDetailsModal").fadeIn();

      $(document).ready(function () {
        let isEditing = false;

        // Toggle editable fields when Update button is clicked
        $("#update-btn").on("click", function () {
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

            const address = $("#modal-address").text();
            const addressParts = address.split(",");
            const addressLine1 = addressParts[0] ? addressParts[0].trim() : "";
            const addressLine2 = addressParts[1] ? addressParts[1].trim() : "";
            const addressLine3 = addressParts[2] ? addressParts[2].trim() : "";
            const addressLine4 = addressParts[3] ? addressParts[3].trim() : "";
            const addressLine5 = addressParts[4] ? addressParts[4].trim() : "";

            // Extract updated data
            const updatedData = {
              firstName: $("#modal-firstName").text(),
              lastName: $("#modal-lastName").text(),
              designation: $("#modal-designation").text(),
              gender: $("#modal-gender").text(),
              joinedDate: $("#modal-joinedDate").text(),
              dob: $("#modal-dob").text(),
              addressLine1: addressLine1,
              addressLine2: addressLine2,
              addressLine3: addressLine3,
              addressLine4: addressLine4,
              addressLine5: addressLine5,
              contactNo: $("#modal-contactNo").text(),
              email: $("#modal-email").text(),
              role: $("#modal-role").text(),
            };

            console.log("Updated data:", updatedData);

            updateStaffMember(staffMember.id, updatedData).then(() => {
              alert("Staff member Updated Successfully!");
              location.reload();
            });

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

      $("#delete-btn").on("click", () => {
        if (confirm("Are you sure you want to delete this crop?")) {
          deleteStaffMember(staffMember.id).then(() => {
            alert("Staff Member deleted Succcessfully!");
            location.reload();
          });
        }
      });

      // // $(document).ready(function () {
      // //   // Populate the modal fields with the provided data
      // //   $("#name").text(staffMember.firstName || "N/A");
      // //   $("#designation").text(staffMember.designation || "N/A");
      // //   $("#gender").text(staffMember.gender || "N/A");
      // //   $("#dob").text(staffMember.dob || "N/A");
      // //   $("#address").text(staffMember.address || "N/A");
      // //   $("#email").text(staffMember.email || "N/A");
      // //   $("#contact").text(staffMember.contact || "N/A");

      // //   // Show the modal
      // //   $("#staff-modal").fadeIn();

      // //

      // })
    });
  });

  // Close modal when the close button is clicked
  // $(".close").on("click", function () {
  //   $("#staff-modal").hide();
  // });
}

$(document).ready(function () {
  // Handle row click event
  $("staff-table").on("click", "tr", function () {
    // Get data from the clicked row
    const firstName = $(this).find("td:nth-child(1)").text();
    const lastName = $(this).find("td:nth-child(2)").text();
    const designation = $(this).find("td:nth-child(3)").text();
    const gender = $(this).find("td:nth-child(4)").text();
    const joinedDate = $(this).find("td:nth-child(5)").text();
    const dob = $(this).find("td:nth-child(6)").text();
    const contactNo = $(this).find("td:nth-child(7)").text();
    const email = $(this).find("td:nth-child(8)").text();
    const role = $(this).find("td:nth-child(9)").text();

    // Concatenate address fields if needed (adapt as per your logic)
    const address = "Sample Address"; // Replace with actual address logic

    // Populate the modal fields
    $("#modal-firstName").text(firstName);
    $("#modal-lastName").text(lastName);
    $("#modal-designation").text(designation);
    $("#modal-gender").text(gender);
    $("#modal-joinedDate").text(joinedDate);
    $("#modal-dob").text(dob);
    $("#modal-address").text(address);
    $("#modal-contactNo").text(contactNo);
    $("#modal-email").text(email);
    $("#modal-role").text(role);

    // Show the modal
    $("#staffDetailsModal").fadeIn();
  });

  // Close the modal when the close button is clicked
  $(".close, #closeModal").on("click", function () {
    $("#staffDetailsModal").fadeOut();
  });

  // Optional: Close the modal when clicking outside of it
  $(window).on("click", function (event) {
    if ($(event.target).is("#staffDetailsModal")) {
      $("#staffDetailsModal").fadeOut();
    }
  });
});

// Close the modal when the close button is clicked
$(".close").on("click", function () {
  $("#staffDetailsModal").fadeOut();
});

// Optional: Close the modal when clicking outside of it
$(window).on("click", function (event) {
  if ($(event.target).is("#staffDetailsModal")) {
    $("#staffDetailsModal").fadeOut();
  }
});

// Add crop modal functionality
$("#openPopup").on("click", () => {
  $("#add-staff-modal").css("display", "flex");
});

$("#add-crop-modal .close").on("click", () => {
  $("#add-staff-modal").css("display", "none");
});

$(window).on("click", (event) => {
  if ($(event.target).is("#add-staff-modal")) {
    $("#add-staff-modal").css("display", "none");
  }
});

$("#save-staff-member").on("click", () => {
  const firstName = $("#first-name").val(); // Get the value of the input field with id "first-name"
  const lastName = $("#last-name").val();
  // Basic details
  const designation = $("#designation").val();
  const gender = $("#gender").val();
  console.log("Gender : " + gender);
  const joinedDate = $("#joined-date").val();
  const dob = $("#dob").val();

  // Address fields
  const addressLine1 = $("#address-line1").val();
  const addressLine2 = $("#address-line2").val();
  const addressLine3 = $("#address-line3").val();
  const addressLine4 = $("#address-line4").val();
  const addressLine5 = $("#address-line5").val();

  // Contact and other details
  const contactNo = $("#contactNo").val();
  const email = $("#email").val();
  const role = $("#role").val();

  const staffDetails = {
    firstName: firstName, // Using the variable
    lastName: lastName, // Using the variable
    designation: designation,
    gender: gender,
    joinedDate: joinedDate,
    dob: dob,
    addressLine1: addressLine1,
    addressLine2: addressLine2,
    addressLine3: addressLine3,
    addressLine4: addressLine4,
    addressLine5: addressLine5,
    contactNo: contactNo,
    email: email,
    role: role,
  };

  saveStaffMember(staffDetails).then(() => {
    alert("Staff Member saved successfully!");
  });

  // Log the JSON object to check its structure
  console.log(JSON.stringify(staffDetails, null, 2));
});

$("#logout-btn").on("click", () => {
  if(confirm("Are you sure want to LogOut?")){
    window.location = "manager/loginpage.html";
  }
});
