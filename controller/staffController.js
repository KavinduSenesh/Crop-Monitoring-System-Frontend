import { getAll, saveStaffMember } from "../../../model/StaffModel.js";

//dahsbord navigation
document.addEventListener("DOMContentLoaded", () => {
    const iconWrappers = document.querySelectorAll(".icon-wrapper");
    
    const navigationLinks = {
        "dashboard.png": "http://127.0.0.1:5502/pages/dashboard.html", // Update with the actual URL
        "staff.png": "http://127.0.0.1:5502/pages/staffManagement.html",
        "vehicle.png": "http://127.0.0.1:5502/pages/vehicleManagement.html",
        "field.png": "/field-management.html",
        "Wrench.png": "http://127.0.0.1:5502/pages/equimpentManagement.html",
        "crop.png": "http://127.0.0.1:5502/pages/cropManagement.html",
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
});


//popup form
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

// Save button click event
$("#saveButton").on("click", () => {
    console.log("Save button clicked");
    const firstName = $('#firstName').val();
    const lastName = $('#lastName').val();
    const designation = $('#designation').val();
    const contactNo = $('#contactNo').val();
    const email = $('#email').val();
    const dateOfBirth = $('#dob').val();
    const joinedDate = $('#joinedDate').val();
    const gender = $('#gender').val();
    const role = $('#role').val();
    const address1 = $('#address-line-1').val();
    const address2 = $('#address-line-2').val();
    const address3 = $('#address-line-3').val();
    const address4 = $('#address-line-4').val();
    const address5 = $('#address-line-5').val();

    const staffMember = {
        firstName: firstName,
        lastName: lastName,
        designation: designation,
        contactNo: contactNo,
        email: email,
        dateOfBirth: dateOfBirth,
        joinedDate: joinedDate,
        gender: gender,
        role: role,
        addressLine1: address1,
        addressLine2: address2,
        addressLine3: address3,
        addressLine4: address4,
        addressLine5: address5
    };

    saveStaffMember(staffMember).then((response) => {
        console.log("Staff member saved successfully:", response);
        alert("Staff member saved successfully");  
    });
});

// Close button click event
function reloadTable(staff) {
    let $tableBody = $("#staff-table-body");
    console.log(staff);
  
    // Clear the table body before adding new rows
    $tableBody.empty();
  
    $.each(staff, function (index, staffMember) {
        let $newRow = $("<tr>").appendTo($tableBody);
  
        // Display only the selected fields
        $("<td>").text(staffMember.firstName).appendTo($newRow);
        $("<td>").text(staffMember.lastName).appendTo($newRow);
        $("<td>").text(staffMember.designation).appendTo($newRow);
        $("<td>").text(staffMember.contactNo).appendTo($newRow);
        $("<td>").text(staffMember.email).appendTo($newRow);
        $("<td>").text(staffMember.role).appendTo($newRow);

        // Commented unnecessary fields
        // const joinedDate = staffMember.joinedDate 
        //   ? new Date(staffMember.joinedDate).toISOString().split("T")[0] 
        //   : "N/A";
        // $("<td>").addClass("th-td-space").text(joinedDate).appendTo($newRow);

        // const dob = staffMember.DOB 
        //   ? new Date(staffMember.DOB).toISOString().split("T")[0] 
        //   : "N/A";
        // $("<td>").addClass("th-td-space").text(dob).appendTo($newRow);
  
        // Attach a click event handler to show the modal when the row is clicked
        $newRow.on("click", function () {
            console.log(`Row clicked for staff: ${staffMember.firstName}`);

            // Populate only the selected fields in the modal
            $("#modal-firstName").text(staffMember.firstName);
            $("#modal-lastName").text(staffMember.lastName);
            $("#modal-designation").text(staffMember.designation);
            $("#modal-contactNo").text(staffMember.contactNo);
            $("#modal-email").text(staffMember.email);
            $("#modal-role").text(staffMember.role);

            // Commented unnecessary fields
            // const address = [
            //   staffMember.addressLine1,
            //   staffMember.addressLine2,
            //   staffMember.addressLine3,
            //   staffMember.addressLine4,
            //   staffMember.addressLine5,
            // ].filter(Boolean).join(", ");
            // $("#modal-address").text(address || "N/A");

            // $("#modal-gender").text(staffMember.gender);
            // $("#modal-joinedDate").text(joinedDate);
            // $("#modal-dob").text(dob);

            // Show the modal
            $("#staffDetailsModal").fadeIn();
        });
    });
}

// Staff Management Controller
$(document).ready(function() {
    // Sample staff data (in a real application, this would come from a backend)
    const staffData = [
        {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            designation: "Senior Scientist",
            contactNo: "123-456-7890",
            email: "john.doe@example.com",
            role: "SCIENTIST",
            gender: "MALE",
            dob: "1985-05-15",
            joinedDate: "2015-03-10",
            address: {
                line1: "123 Science Street",
                line2: "Research Complex",
                line3: "Innovation Park",
                line4: "Green Valley",
                line5: "Research City"
            }
        },
        {
            id: 2,
            firstName: "Jane",
            lastName: "Smith",
            designation: "Manager",
            contactNo: "987-654-3210",
            email: "jane.smith@example.com",
            role: "MANAGER",
            gender: "FEMALE",
            dob: "1990-07-22",
            joinedDate: "2018-06-15",
            address: {
                line1: "456 Management Road",
                line2: "Administrative Block",
                line3: "Business Center",
                line4: "Corporate Campus",
                line5: "Leadership City"
            }
        }
    ];

    // Function to populate the staff table
    function populateStaffTable() {
        const tableBody = $("#staff-table-body");
        tableBody.empty();

        staffData.forEach(staff => {
            const row = `
                <tr data-staff-id="${staff.id}">
                    <td>${staff.firstName}</td>
                    <td>${staff.lastName}</td>
                    <td>${staff.designation}</td>
                    <td>${staff.contactNo}</td>
                    <td>${staff.email}</td>
                    <td>${staff.role}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-sm btn-primary view-staff-btn">View</button>
                            <button class="btn btn-sm btn-danger delete-staff-btn">Delete</button>
                        </div>
                    </td>
                </tr>
            `;
            tableBody.append(row);
        });
    }

    // Initial table population
    populateStaffTable();

    // Open Popup Button
    $("#openPopup").on("click", function() {
        $("#popup").css("display", "flex");
        // Reset form
        $("#staffForm")[0].reset();
        // Show/hide appropriate buttons
        $("#saveButton").show();
        $("#updateButton, #deleteButton").hide();
    });

    // Close Popup Button
    $("#closePopup, #cancelButton").on("click", function() {
        $("#popup").hide();
    });

    // View Staff Button (in table)
    $(document).on("click", ".view-staff-btn", function() {
        const staffId = $(this).closest("tr").data("staff-id");
        const staff = staffData.find(s => s.id === staffId);

        if (staff) {
            // Populate form with staff details
            $("#firstName").val(staff.firstName);
            $("#lastName").val(staff.lastName);
            $("#designation").val(staff.designation);
            $("#gender").val(staff.gender);
            $("#dob").val(staff.dob);
            $("#joinedDate").val(staff.joinedDate);
            $("#address-line-1").val(staff.address.line1);
            $("#address-line-2").val(staff.address.line2);
            $("#address-line-3").val(staff.address.line3);
            $("#address-line-4").val(staff.address.line4);
            $("#address-line-5").val(staff.address.line5);
            $("#contactNo").val(staff.contactNo);
            $("#email").val(staff.email);
            $("#role").val(staff.role);

            // Show popup
            $("#popup").css("display", "flex");
            
            // Show update/delete buttons, hide save
            $("#updateButton").show();
            $("#saveButton, #deleteButton").hide();
        }
    });

    // Delete Staff Button (in table)
    $(document).on("click", ".delete-staff-btn", function() {
        const staffId = $(this).closest("tr").data("staff-id");
        const index = staffData.findIndex(s => s.id === staffId);

        if (index !== -1) {
            // Remove from array
            staffData.splice(index, 1);
            // Repopulate table
            populateStaffTable();
        }
    });

    // Save New Staff
    $("#saveButton").on("click", function() {
        const newStaff = {
            id: staffData.length + 1,
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            designation: $("#designation").val(),
            gender: $("#gender").val(),
            dob: $("#dob").val(),
            joinedDate: $("#joinedDate").val(),
            address: {
                line1: $("#address-line-1").val(),
                line2: $("#address-line-2").val(),
                line3: $("#address-line-3").val(),
                line4: $("#address-line-4").val(),
                line5: $("#address-line-5").val()
            },
            contactNo: $("#contactNo").val(),
            email: $("#email").val(),
            role: $("#role").val()
        };

        staffData.push(newStaff);
        populateStaffTable();
        $("#popup").hide();
    });

    // Update Staff
    $("#updateButton").on("click", function() {
        const staffId = $("tr[data-staff-id]").data("staff-id");
        const staffIndex = staffData.findIndex(s => s.id === staffId);

        if (staffIndex !== -1) {
            staffData[staffIndex] = {
                id: staffId,
                firstName: $("#firstName").val(),
                lastName: $("#lastName").val(),
                designation: $("#designation").val(),
                gender: $("#gender").val(),
                dob: $("#dob").val(),
                joinedDate: $("#joinedDate").val(),
                address: {
                    line1: $("#address-line-1").val(),
                    line2: $("#address-line-2").val(),
                    line3: $("#address-line-3").val(),
                    line4: $("#address-line-4").val(),
                    line5: $("#address-line-5").val()
                },
                contactNo: $("#contactNo").val(),
                email: $("#email").val(),
                role: $("#role").val()
            };

            populateStaffTable();
            $("#popup").hide();
        }
    });

    // Search functionality
    $(".search_input").on("keyup", function() {
        const searchTerm = $(this).val().toLowerCase();
        
        $("#staff-table-body tr").filter(function() {
            $(this).toggle(
                $(this).text().toLowerCase().indexOf(searchTerm) > -1
            );
        });
    });
});
