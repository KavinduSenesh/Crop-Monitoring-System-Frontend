import { getAll, saveStaffMember } from "../../../model/StaffModel.js";

document.addEventListener("DOMContentLoaded", () => {
    const iconWrappers = document.querySelectorAll(".icon-wrapper");
    
    const navigationLinks = {
        "dashboard.png": "http://127.0.0.1:5502/pages/dashboard.html", // Update with the actual URL
        "staff.png": "http://127.0.0.1:5502/pages/staffManagement.html",
        "vehicle.png": "http://127.0.0.1:5502/pages/vehicleManagement.html",
        "field.png": "/field-management.html",
        "Wrench.png": "http://127.0.0.1:5502/pages/equimpentManagement.html",
        "crop.png": "/crop-management.html",
        "Clipboard.png": "/monitoring-logs.html",
        "Logout.png": "http://127.0.0.1:5502/index.html"
    };

    iconWrappers.forEach(wrapper => {
        const img = wrapper.querySelector("img");
        const imageName = img.src.split("/").pop(); // Extract file name from the src
        const targetLink = navigationLinks[imageName];

        if (targetLink) {
            wrapper.addEventListener("click", () => {
                window.location.href = targetLink;
            });
        }
    });
});


getAll().then((staff) => {
    console.log("Staff members:", staff);
    reloadTable(staff);
})

const openPopup = document.getElementById('openPopup');
        const closePopup = document.getElementById('closePopup');
        const popup = document.getElementById('popup');

        openPopup.addEventListener('click', () => {
            popup.style.display = 'flex';
        });

        closePopup.addEventListener('click', () => {
            popup.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === popup) {
                popup.style.display = 'none';
            }
        });
        document.querySelector(".logout-btn").addEventListener("click", () => {
        window.location.href = "http://127.0.0.1:5500/GreenShadow%20Frontend/index.html";
        });


$("#saveButton").on("click", () => {
    console.log("Save button clicked");
    const firstName = $('#firstName').val();
    const lastName = $('#lastName').val();
    const designation = $('#designation').val();
    const dob = $('#dob').val();
    const joinedDate = $('#joinedDate').val();
    const contactNo = $('#contactNo').val();
    const email = $('#email').val();
    
    // Get value from select dropdowns
    const gender = $('#gender').val();
    const role = $('#role').val();
    
    // Get values from text areas (address lines)
    const address1 = $('#address-line-1').val();
    const address2 = $('#address-line-2').val();
    const address3 = $('#address-line-3').val();
    const address4 = $('#address-line-4').val();
    const address5 = $('#address-line-5').val();

    const staffMember = {
        firstName:firstName,
        lastName:lastName,
        designation:designation,
        dateOfBirth:dob,
        joinedDate:joinedDate,
        contactNo:contactNo,
        email:email,
        gender:gender,
        role:role,
        addressLine1:address1,
        addressLine2:address2,
        addressLine3:address3,
        addressLine4:address4,
        addressLine5:address5,
    }

    saveStaffMember(staffMember).then((response) => {
        console.log("Staff member saved successfully:", response);
        alert("Staff member saved successfully");  
    })
})


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
      $("<td>").addClass("th-td-space").text(staffMember.designation).appendTo($newRow);
      $("<td>").addClass("th-td-space").text(staffMember.gender).appendTo($newRow);
  
      const joinedDate = staffMember.joinedDate 
        ? new Date(staffMember.joinedDate).toISOString().split("T")[0] 
        : "N/A";
      $("<td>").addClass("th-td-space").text(joinedDate).appendTo($newRow);
  
      const dob = staffMember.DOB 
        ? new Date(staffMember.DOB).toISOString().split("T")[0] 
        : "N/A";
      $("<td>").addClass("th-td-space").text(dob).appendTo($newRow);
  
      $("<td>").addClass("th-td-space").text(staffMember.contactNo).appendTo($newRow);
      $("<td>").addClass("th-td-space").text(staffMember.email).appendTo($newRow);
      $("<td>").addClass("th-td-space").text(staffMember.role).appendTo($newRow);
  
      // Attach a click event handler to show the modal when the row is clicked
      $newRow.on("click", function () {
        console.log(`Row clicked for staff: ${staffMember.firstName}`);
  
        // Populate the model fields
        $("#modal-firstName").text(staffMember.firstName);
        $("#modal-lastName").text(staffMember.lastName);
        $("#modal-designation").text(staffMember.designation);
        $("#modal-gender").text(staffMember.gender);
        $("#modal-joinedDate").text(joinedDate);
        $("#modal-dob").text(dob);
  
        const address = [
          staffMember.addressLine1,
          staffMember.addressLine2,
          staffMember.addressLine3,
          staffMember.addressLine4,
          staffMember.addressLine5,
        ]
          .filter(Boolean)
          .join(", ");
        $("#modal-address").text(address || "N/A");
  
        $("#modal-contactNo").text(staffMember.contactNo);
        $("#modal-email").text(staffMember.email);
        $("#modal-role").text(staffMember.role);
  
        // Show the modal
        $("#staffDetailsModal").fadeIn();
      });
    });
  }
  
  // Update Button Logic
  let isEditing = false;
  
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
      const updatedData = {
        firstName: $("#modal-firstName").text(),
        lastName: $("#modal-lastName").text(),
        designation: $("#modal-designation").text(),
        gender: $("#modal-gender").text(),
        joinedDate: $("#modal-joinedDate").text(),
        dob: $("#modal-dob").text(),
        addressLine1: addressParts[0]?.trim() || "",
        addressLine2: addressParts[1]?.trim() || "",
        addressLine3: addressParts[2]?.trim() || "",
        addressLine4: addressParts[3]?.trim() || "",
        addressLine5: addressParts[4]?.trim() || "",
        contactNo: $("#modal-contactNo").text(),
        email: $("#modal-email").text(),
        role: $("#modal-role").text(),
      };
  
      console.log("Updated data:", updatedData);
  
      updateStaffMember(updatedData.id, updatedData).then(() => {
        alert("Staff member updated successfully!");
        location.reload();
      });
  
      $(this).text("Update");
      isEditing = false;
    }
  });
  
  