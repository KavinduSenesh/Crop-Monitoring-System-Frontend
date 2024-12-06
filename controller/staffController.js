import { deleteStaffMember, getAllStaff, getStaff, saveStaff } from "../model/staffModel.js";

var targetStaffId = null;

//dahsbord navigation
document.addEventListener("DOMContentLoaded", () => {
    const iconWrappers = document.querySelectorAll(".icon-wrapper");
    
    const navigationLinks = {
        "dashboard.png": "http://127.0.0.1:5502/pages/dashboard.html", // Update with the actual URL
        "staff.png": "http://127.0.0.1:5502/pages/staffManagement.html",
        "vehicle.png": "http://127.0.0.1:5502/pages/vehicleManagement.html",
        "field.png": "http://127.0.0.1:5502/pages/fieldManagement.html",
        "Wrench.png": "http://127.0.0.1:5502/pages/equimpentManagement.html",
        "crop.png": "http://127.0.0.1:5502/pages/cropManagement.html",
        "Clipboard.png": "http://127.0.0.1:5502/pages/monitoringLogManagement.html",
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


function loadStaffTable() {
    const table = $("#staff-table-body");
    table.empty();

    getAllStaff().then((staffList) => {
        staffList.forEach((staff) => {
            const row = `<tr>
                <td>${staff.firstName}</td>
             <td>${staff.lastName}</td>
             <td>${staff.designation}</td>
             <td>${staff.contactNo}</td>
             <td>${staff.email}</td>
             <td>${staff.role}</td>
             <td>
                 <div class="action-buttons">
                     <button class="btn btn-sm btn-primary view-staff-btn" data-id="${staff.staffId}">View</button>
                     <button class="btn btn-sm btn-danger delete-staff-btn" data-id="${staff.staffId}">Delete</button>
                 </div>
             </td>
            </tr>`;
            table.append(row);
        });
    });
}

$(document).ready(() => {
    loadStaffTable();
});

// Save button function for staff
$("#saveButton").click(() => {
    const firstName = $("#firstName").val();
    const lastName = $("#lastName").val();
    const designation = $("#designation").val();
    const gender = $("#gender").val();
    const dob = $("#dob").val();
    const joinedDate = $("#joinedDate").val();
    const addressLine1 = $("#address-line-1").val();
    const addressLine2 = $("#address-line-2").val();
    const addressLine3 = $("#address-line-3").val();
    const addressLine4 = $("#address-line-4").val();
    const addressLine5 = $("#address-line-5").val();
    const contactNo = $("#contactNo").val();
    const email = $("#email").val();
    const role = $("#role").val();

    const staffData = {
        "firstName": firstName,
        "lastName": lastName,
        "designation": designation,
        "gender": gender,
        "joinedDate": dob,
        "dateOfBirth": joinedDate,
        "addressLine1": addressLine1,
        "addressLine2": addressLine2,
        "addressLine3": addressLine3,
        "addressLine4": addressLine4,
        "addressLine5": addressLine5,
        "contactNo": contactNo,
        "email": email,
        "role": role
    }

    saveStaff(staffData).then(() => {
        loadStaffTable();

        alert("Staff member saved successfully!");
    }).catch((error) => {
        console.log("Failed to save staff: " + error);
    });
});

$("#openPopup").click(() => {
    // loadDataToSave();
});

// Update button function for staff
$("#updateButton").click(() => {
    const firstName = $("#firstName").val();
    const lastName = $("#lastName").val();
    const designation = $("#designation").val();
    const gender = $("#gender").val();
    const dob = $("#dob").val();
    const joinedDate = $("#joinedDate").val();
    const addressLine1 = $("#address-line-1").val();
    const addressLine2 = $("#address-line-2").val();
    const addressLine3 = $("#address-line-3").val();
    const addressLine4 = $("#address-line-4").val();
    const addressLine5 = $("#address-line-5").val();
    const contactNo = $("#contactNo").val();
    const email = $("#email").val();
    const role = $("#role").val();

    const staffData = {
        "firstName": firstName,
        "lastName": lastName,
        "designation": designation,
        "gender": gender,
        "joinedDate": dob,
        "dateOfBirth": joinedDate,
        "addressLine1": addressLine1,
        "addressLine2": addressLine2,
        "addressLine3": addressLine3,
        "addressLine4": addressLine4,
        "addressLine5": addressLine5,
        "contactNo": contactNo,
        "email": email,
        "role": role
    }


    updateStaff(targetStaffId, staffData).then(() => {
        loadStaffTable();

        alert("Staff member updated successfully!");
    }).catch((error) => {
        console.log("Failed to update staff: " + error);
    });
});

function loadDataToUpdateStaff() {
    getStaff(targetStaffId).then((staff) => {
        $("#firstName").val(staff.firstName);
        $("#lastName").val(staff.lastName);
        $("#designation").val(staff.designation);
        $("#gender").val(staff.gender);
        $("#dob").val(staff.dob);
        $("#joinedDate").val(staff.joinedDate);
        $("#address-line-1").val(staff.addressLine1);
        $("#address-line-2").val(staff.addressLine2);
        $("#address-line-3").val(staff.addressLine3);
        $("#address-line-4").val(staff.addressLine4);
        $("#address-line-5").val(staff.addressLine5);
        $("#contactNo").val(staff.contactNo);
        $("#email").val(staff.email);
        $("#role").val(staff.role);
    }).catch((error) => {
        console.error("Failed to load staff: " + error);
    });
}

$("#staff-table-body").on("click", ".view-staff-btn", event => {
    targetStaffId = event.target.getAttribute("data-id");
    // loadDataToSave();
    loadDataToUpdateStaff();
    popup.style.display = "flex";
});

$("#staff-table-body").on("click", ".delete-staff-btn", event => {
    const staffId = event.target.getAttribute("data-id");

    if (confirm("Are you sure you want to delete this staff member?")) {
        deleteStaffMember(staffId).then(() => {
            loadStaffTable();
            alert("Staff member deleted successfully!");
        }).catch((error) => {
            console.error("Failed to delete staff: " + error);
            alert("Failed to delete staff member. Please try again.");
        });
    }
});

$("#staff-table-body").on("click", ".view-staff-btn", event => {
    targetStaffId = event.target.getAttribute("data-id");
    // loadDataToSave();
    loadDataToUpdateStaff();
    popup.style.display = "flex";

    $("#saveButton").hide();
    $("#updateButton, #deleteButton").show();
});

function resetStaffFormForNewEntry() {
    // Reset the form
    $("#firstName, #lastName, #designation, #gender, #dob, #joinedDate, #address-line-1, #address-line-2, #address-line-3, #address-line-4, #address-line-5, #contactNo, #email, #role").val('');
    
    // Show save button and hide update/delete buttons
    $("#saveButton").show();
    $("#updateButton, #deleteButton").hide();
}

openPopup.addEventListener("click", () => {
    popup.style.display = 'flex';
    resetStaffFormForNewEntry();
});

$("#deleteButton").click(() => {  
    if (confirm("Are you sure you want to delete this staff member?")) {
        deleteStaffMember(targetStaffId).then(() => {
            loadStaffTable();
            alert("Staff member deleted successfully!");
        }).catch((error) => {
            console.error("Failed to delete staff: " + error);
            alert("Failed to delete staff member. Please try again.");
        });
    }
});

$("#vehiecle-table-body").on("click", ".view-vehicle-btn", event => {
    targetVehicleId = event.target.getAttribute("data-id");
    // loadDataToSave();
    loadDataToUpdateVehicle();
    popup.style.display = "flex";

    $("#saveButton").hide();
    $("#updateButton, #deleteButton").show();
});

// Search functionality for staff management table
$(document).ready(function() {
    // Get references to the search input and staff table body
    const searchInput = $('#Search');
    const staffTableBody = $('#staff-table-body');

    // Add event listener for input in the search field
    searchInput.on('input', function() {
        // Get the current search term and convert to lowercase
        const searchTerm = $(this).val().toLowerCase().trim();

        // Get all table rows
        const rows = staffTableBody.find('tr');

        // Loop through each row and check for matches
        rows.each(function() {
            const row = $(this);
            let rowMatches = false;

            // Check each cell for a match with the search term
            row.find('td').each(function() {
                const cellText = $(this).text().toLowerCase();
                if (cellText.includes(searchTerm)) {
                    rowMatches = true;
                    return false; // Break the inner loop if a match is found
                }
            });

            // Show or hide the row based on match
            if (rowMatches) {
                row.show();
            } else {
                row.hide();
            }
        });

        // Optional: Add a message if no results are found
        const visibleRows = rows.filter(':visible');
        if (visibleRows.length === 0) {
            const columnCount = staffTableBody.find('tr:first td').length;
            staffTableBody.append(`
                <tr class="no-results">
                    <td colspan="${columnCount}" class="text-center">
                        No staff member found matching your search.
                    </td>
                </tr>
            `);
        } else {
            // Remove any existing no results message
            staffTableBody.find('.no-results').remove();
        }
    });
});




































































































// // Assuming you're using fetch for API calls and have a backend endpoint
// async function getAllStaffMembers() {
//     try {
//         // Replace with your actual API endpoint
//         const staffList = await getAllStaff();
        
//         // Populate the table with retrieved staff members
//         populateStaffTable(staffList);
//     } catch (error) {
//         console.error('Error fetching staff:', error);
        
//         // Optional: Display error message to user
//         const tableBody = document.getElementById('staff-table-body');
//         tableBody.innerHTML = `
//             <tr>
//                 <td colspan="7" style="text-align: center; color: red;">
//                     Failed to load staff members. Please try again later.
//                 </td>
//             </tr>
//         `;
//     }
// }

// // When view button clicked, fetch staff details and populate form
// // Function to populate staff table (as previously discussed)
// function populateStaffTable(staffList) {
//     const tableBody = document.getElementById('staff-table-body');
//     tableBody.innerHTML = ''; // Clear existing rows

//     staffList.forEach(staff => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${staff.firstName}</td>
//             <td>${staff.lastName}</td>
//             <td>${staff.designation}</td>
//             <td>${staff.contactNo}</td>
//             <td>${staff.email}</td>
//             <td>${staff.role}</td>
//             <td>
//                 <div class="action-buttons">
//                     <button class="btn btn-sm btn-primary view-staff-btn" data-id="${staff.staffId}">View</button>
//                     <button class="btn btn-sm btn-danger delete-staff-btn" data-id="${staff.staffId}">Delete</button>
//                 </div>
//             </td>
//         `;
//         tableBody.appendChild(row);
//     });

//     // Add event listeners for update and delete buttons
//     addActionButtonListeners();
// }

// //
// // Function to add event listeners to action buttons
// function addActionButtonListeners() {
//     document.querySelectorAll('.view-staff-btn').forEach(button => {
//         button.addEventListener('click', function() {
//             const staffId = this.getAttribute('data-id');
//             // openUpdatePopup(staffId);
//              // Show popup
//         $("#popup").css("display", "flex");
        
//         // Hide save and delete buttons
//         $("#saveButton, #deleteButton").hide();
        
//         // Show update button
//         $("#updateButton").show();

//         // Disable all form inputs to make it read-only
//         $("#staffForm input, #staffForm select").prop('disabled', false);
        
//         openUpdatePopup(staffId);

//         // alert('View button clicked for staff ID: ' + staffId);

//         targetStaffId = staffId;


//     });
//     });

//     document.querySelectorAll('.delete-staff-btn').forEach(button => {
//         button.addEventListener('click', function() {
//             const staffId = this.getAttribute('data-id');
//             confirmDeleteStaff(staffId);
//         });
//     });
// }

// // Function to open popup for updating staff
// function openUpdatePopup(staffId) {
//     const popup = document.getElementById('popup');
//     popup.style.display = 'flex';

//     // Fetch specific staff details to pre-fill the form
//     fetchStaffDetails(staffId);
// }

// // Function to fetch staff details and populate form fields
// async function fetchStaffDetails(staffId) {
//     try {
//         const response = await fetch(`http://localhost:5055/greenShadow/api/v1/staff/${staffId}`);
        
//         if (!response.ok) {
//             throw new Error('Failed to fetch staff details');
//         }
        
//         const staffDetails = await response.json();
        
//         // Helper function to safely set date values
//         const safeSetDateValue = (elementId, dateValue) => {
//             const element = document.getElementById(elementId);
//             if (element && dateValue) {
//                 // Ensure date is in correct format
//                 const formattedDate = new Date(dateValue).toISOString().split('T')[0];
//                 element.value = formattedDate;
//             }
//         };

//         // Add this line to set the staff ID in a hidden input
//         // If the hidden input doesn't exist, create it
//         let hiddenStaffIdInput = document.getElementById('staffId');
//         if (!hiddenStaffIdInput) {
//             hiddenStaffIdInput = document.createElement('input');
//             hiddenStaffIdInput.type = 'hidden';
//             hiddenStaffIdInput.id = 'staffId';
//             hiddenStaffIdInput.name = 'staffId';
//             document.getElementById('staffForm').appendChild(hiddenStaffIdInput);
//         }
//         hiddenStaffIdInput.value = staffId;
        
//         // Destructure and set values with null checks
//         const {
//             firstName = '', 
//             lastName = '', 
//             designation = '', 
//             gender = '', 
//             dateOfBirth,
//             joinedDate,
//             addressLine1 = '',
//             addressLine2 = '',
//             addressLine3 = '',
//             addressLine4 = '',
//             addressLine5 = '',
//             contactNo = '',
//             email = '',
//             role = ''
//         } = staffDetails;
        
//         // Set form field values
//         document.getElementById('firstName').value = firstName;
//         document.getElementById('lastName').value = lastName;
//         document.getElementById('designation').value = designation;
//         document.getElementById('gender').value = gender;
        
//         // Set dates
//         safeSetDateValue('dob', dateOfBirth);
//         safeSetDateValue('joinedDate', joinedDate);
        
//         // Set address lines
//         document.getElementById('address-line-1').value = addressLine1;
//         document.getElementById('address-line-2').value = addressLine2;
//         document.getElementById('address-line-3').value = addressLine3;
//         document.getElementById('address-line-4').value = addressLine4;
//         document.getElementById('address-line-5').value = addressLine5;
        
//         document.getElementById('contactNo').value = contactNo;
//         document.getElementById('email').value = email;
//         document.getElementById('role').value = role;
//     } catch (error) {
//         console.error('Error fetching staff details:', error);
//         alert('Failed to load staff details. Please try again.');
//     }
// }

// // Function to confirm and handle staff deletion
// async function confirmDeleteStaff(staffId) {
//     const confirmDelete = confirm('Are you sure you want to delete this staff member?');
    
//     if (confirmDelete) {
//         try {
//             // Await the result of deleteStaffMember
//             await deleteStaffMember(staffId);
            
//             // Refresh the staff list after successful deletion
//             getAllStaffMembers();
//             alert('Staff member deleted successfully');
//         } catch (error) {
//             console.error('Error deleting staff:', error);
//             alert('Failed to delete staff member. Please try again.');
//         }
//     }
// }

// // Event listener for page load to fetch staff members
// document.addEventListener('DOMContentLoaded', () => {
//     getAllStaffMembers();

//     // Add event listener for the add new staff button
//     const openPopupBtn = document.getElementById('openPopup');
//     openPopupBtn.addEventListener('click', () => {
//         // const popup = document.getElementById('popup');
//         // popup.style.display = 'flex';

//          // Show popup
//          $("#popup").css("display", "flex");
//          // Hide save and delete buttons
//          $("#updateButton, #deleteButton").hide();
//          // Show update button
//          $("#saveButton").show();
//          // Disable all form inputs to make it read-only
//          $("#staffForm input, #staffForm select").prop('disabled', false);

//         // Optional: Reset form for new entry
//         document.getElementById('staffForm').reset();
//     });

//     // Close popup event listener
//     const closePopupBtn = document.getElementById('closePopup');
//     closePopupBtn.addEventListener('click', () => {
//         const popup = document.getElementById('popup');
//         popup.style.display = 'none';
//     });

//     // Cancel button in popup
//     const cancelButton = document.getElementById('cancelButton');
//     cancelButton.addEventListener('click', () => {
//         const popup = document.getElementById('popup');
//         popup.style.display = 'none';
//     });
// });

// // Export functions if using modules
// export { 
//     getAllStaffMembers, 
//     populateStaffTable, 
//     openUpdatePopup, 
//     confirmDeleteStaff 
// };


// //Save staff member
// // Function to save new staff member
// async function saveStaffMember(event) {
//     event.preventDefault(); // Prevent form submission

//     const staffForm = document.getElementById('staffForm');
//     const formData = new FormData(staffForm);

//     const staffData = {
//         firstName: formData.get('firstName'),
//         lastName: formData.get('lastName'),
//         designation: formData.get('designation'),
//         gender: formData.get('gender'),
//         dateOfBirth: formData.get('dob'),
//         joinedDate: formData.get('joinedDate'),
//         addressLine1: formData.get('addressLine1'),
//         addressLine2: formData.get('addressLine2'),
//         addressLine3: formData.get('addressLine3'),
//         addressLine4: formData.get('addressLine4'),
//         addressLine5: formData.get('addressLine5'),
//         contactNo: formData.get('contactNo'),
//         email: formData.get('email'),
//         role: formData.get('role')
//     };

//         const response = await saveStaff(staffData);
//         // Refresh the staff list after successful save
//         getAllStaffMembers();
//         alert('Staff member saved successfully');

//         // Close the popup
//         const popup = document.getElementById('popup');
//         popup.style.display = 'none';
    
//         // console.error('Error saving staff member:', error);
//         // alert('Failed to save staff member. Please try again.');
    
// }

// // Add event listener for save button
// document.getElementById('saveButton').addEventListener('click', saveStaffMember);

// function updateStaffMember(){

//     //   const staffId = document.getElementById('staffId').value;
//       const firstName = document.getElementById('firstName').value;
//       const lastName = document.getElementById('lastName').value;
//       const designation = document.getElementById('designation').value;
//       const gender = document.getElementById('gender').value;
//       const dob = document.getElementById('dob').value;
//       const joinedDate = document.getElementById('joinedDate').value;
//       const addressLine1 = document.getElementById('address-line-1').value;
//       const addressLine2 = document.getElementById('address-line-2').value;
//       const addressLine3 = document.getElementById('address-line-3').value;
//       const addressLine4 = document.getElementById('address-line-4').value;
//       const addressLine5 = document.getElementById('address-line-5').value;
//       const contactNo = document.getElementById('contactNo').value;
//       const email = document.getElementById('email').value;
//       const role = document.getElementById('role').value;

//         const staffData = {
//             "firstName": firstName,
//             "lastName": lastName,
//             "designation": designation,
//             "gender": gender,
//             "joinedDate": joinedDate,
//             "dateOfBirth": dob,
//             "addressLine1": addressLine1,
//             "addressLine2": addressLine2,
//             "addressLine3": addressLine3,
//             "addressLine4": addressLine4,
//             "addressLine5": addressLine5,
//             "contactNo": contactNo,
//             "email": email,
//             "role": role
//         };

//         updateStaff(targetStaffId, staffData).then(() => {
//             getAllStaffMembers();
//             alert('Staff member updated successfully');
//             // const popup = document.getElementById('popup');
//             // popup.style.display = 'none';
            
//         }).catch(error => {
//             console.error('Error updating staff member:', error);
//             alert(`Failed to update staff member: ${error.message}`);
//         });
// }

// document.addEventListener('DOMContentLoaded', () => {
//     const updateButton = document.getElementById('updateButton');
//     if (updateButton) {
//         updateButton.addEventListener('click', updateStaffMember);
//     } else {
//         console.error('Update button not found');
//     }
// });

// // Search functionality for staff management table
// $(document).ready(function() {
//     // Get references to the search input and staff table body
//     const searchInput = $('#Search');
//     const staffTableBody = $('#staff-table-body');

//     // Add event listener for input in the search field
//     searchInput.on('input', function() {
//         // Get the current search term and convert to lowercase
//         const searchTerm = $(this).val().toLowerCase().trim();

//         // Get all table rows
//         const rows = staffTableBody.find('tr');

//         // Loop through each row and check for matches
//         rows.each(function() {
//             const row = $(this);
//             let rowMatches = false;

//             // Check each cell for a match with the search term
//             row.find('td').each(function() {
//                 const cellText = $(this).text().toLowerCase();
//                 if (cellText.includes(searchTerm)) {
//                     rowMatches = true;
//                     return false; // Break the inner loop if a match is found
//                 }
//             });

//             // Show or hide the row based on match
//             if (rowMatches) {
//                 row.show();
//             } else {
//                 row.hide();
//             }
//         });

//         // Optional: Add a message if no results are found
//         const visibleRows = rows.filter(':visible');
//         if (visibleRows.length === 0) {
//             const columnCount = staffTableBody.find('tr:first td').length;
//             staffTableBody.append(`
//                 <tr class="no-results">
//                     <td colspan="${columnCount}" class="text-center">
//                         No staff members found matching your search.
//                     </td>
//                 </tr>
//             `);
//         } else {
//             // Remove any existing no results message
//             staffTableBody.find('.no-results').remove();
//         }
//     });
// });

// async function updateStaffMember(event) {
//     event.preventDefault();
    
//     // const staffForm = document.getElementById('staffForm');
//     // const formData = new FormData(staffForm);
    
//     const staffId = document.getElementById('staffId').value;
    
//     console.log("Attempting to update Staff ID:", staffId);
    
//     if (!staffId) {
//         console.error('Staff ID is missing');
//         alert('Please ensure a staff ID is selected');
//         return;
//     }

//     const staffData = {
//         staffId: staffId,
//         firstName: formData.get('firstName'),
//         lastName: formData.get('lastName'),
//         designation: formData.get('designation'),
//         gender: formData.get('gender'),
//         dateOfBirth: formData.get('dob'),
//         joinedDate: formData.get('joinedDate'),
//         addressLine1: formData.get('addressLine1'),
//         addressLine2: formData.get('addressLine2'),
//         addressLine3: formData.get('addressLine3'),
//         addressLine4: formData.get('addressLine4'),
//         addressLine5: formData.get('addressLine5'),
//         contactNo: formData.get('contactNo'),
//         email: formData.get('email'),
//         role: formData.get('role')
//     };

//     try {
//         const response = await fetch(`http://localhost:5055/greenShadow/api/v1/staff/${staffId}`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(staffData)
//         });

//         // Log the full response for debugging
//         console.log('Response status:', response.status);
//         console.log('Response headers:', Object.fromEntries(response.headers.entries()));

//         if (!response.ok) {
//             const errorText = await response.text();
//             console.error('Server response:', errorText);
//             throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//         }

//         const result = await response.json();
//         console.log('Update successful:', result);

//         getAllStaff();
//         alert('Staff member updated successfully');

//         const popup = document.getElementById('popup');
//         popup.style.display = 'none';
//     } catch (error) {
//         console.error('Error updating staff member:', error);
//         alert(`Failed to update staff member: ${error.message}`);
//     }
// }

// Ensure the event listener is added after the DOM is fully loaded



