import { deleteEquipment, getAllEquipments, getEquipment, saveEquipment, updateEquipment } from "../model/equipmentModel.js";
import { getAllFields } from "../model/fieldModel.js";
import { getAllStaff } from "../model/staffModel.js";

var targetEquipmentId = null;

//dashboard
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

{/* <td>${equipment.staffId || 'No Staff Assigned'}</td> */}
{/* <td>${equipment.fieldCode || 'No Field Assigned'}</td> */}

function loadTable() {
    const table = $("#staff-table-body");
    table.empty();

    getAllEquipments().then((equipmentList) => {
    console.log("Equipment List:", equipmentList);

        equipmentList.forEach((equipment) => {
        console.log("Individual Equipment:", equipment);  

            const row = `<tr>
                <td>${equipment.equipmentName || 'N/A'}</td>
                <td>${equipment.equipmentType || 'N/A'}</td>
                <td>${equipment.availabilityStatus || 'N/A'}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-sm btn-primary view-equipment-btn" data-id="${equipment.equipmentId}">View</button>
                        <button class="btn btn-sm btn-danger delete-equipment-btn" data-id="${equipment.equipmentId}">Delete</button>
                    </div>
                </td>
            </tr>`;
            table.append(row);
        });
    });
}

$(document).ready(() => {
    loadTable();
});


$("#saveButton").click(() => {
    const equipmentName = $("#equipment-name").val();
    const equipmentType = $("#type").val();
    const status = $("#status").val();
    const allocatedField = $("#allocated-field").val();
    const allocatedStaff = $("#allocated-staff").val();

    const equipmentData = {
        "equipmentName": equipmentName,
        "equipmentType": equipmentType,
        "availabilityStatus": status,
        "staffId": allocatedStaff,
        "fieldCode": allocatedField
    }

    saveEquipment(equipmentData).then(() => {
        loadTable();

        alert("Equipment saved successfully!");
    }).catch((error) => {
        console.error("Failed to save equipment:", error.responseText || error);
        alert(`Failed to save equipment: ${error.responseText || error}`);
    });
});

//load staff ids
function loadDataToSaveStaff(){
    const staffCombo = $("#allocated-staff")
    staffCombo.empty();
    getAllStaff().then((staff) => {
        staff.forEach((staff) => {
            const option = `<option value="${staff.staffId}">${staff.staffId} , ${staff.firstName}</option>`;
            staffCombo.append(option);
        });
    }).catch((error) => {
        console.error("Failed to load staff: " + error);
    });
}

function loadDataToSaveField(){
    const fieldCombo = $("#allocated-field")
    fieldCombo.empty();
    getAllFields().then((fields) => {
        fields.forEach((field) => {
            const option = `<option value="${field.fieldCode}">${field.fieldCode} , ${field.fieldName}</option>`;
            fieldCombo.append(option);
        });
    }).catch((error) => {
        console.error("Failed to load fields: " + error);
    });
}

$("#openPopup").click(() => {
    loadDataToSaveStaff();
    loadDataToSaveField();
});

// Update button function for Equipment
$("#updateButton").click(() => {
    const equipmentName = $("#equipment-name").val();
    const equipmentType = $("#type").val();
    const status = $("#status").val();
    const allocatedField = $("#allocated-field").val();
    const allocatedStaff = $("#allocated-staff").val();

    const equipmentData = {
        "equipmentName": equipmentName,
        "equipmentType": equipmentType,
        "availabilityStatus": status,
        "staffId": allocatedStaff,
        "fieldCode": allocatedField
    };

    // Assuming `targetEquipmentId` is globally defined or passed to the function
    updateEquipment(targetEquipmentId, equipmentData, allocatedStaff, allocatedField).then(() => {
        loadTable(); // Reload table with updated data
        alert("Equipment updated successfully!");
    }).catch((error) => {
        console.log("Failed to update equipment: " + error);
    });
});

function loadDataToupdate() {
    getEquipment(targetEquipmentId).then((equipment) => {
        $("#equipment-name").val(equipment.equipmentName);
        $("#type").val(equipment.equipmentType);
        $("#status").val(equipment.availabilityStatus);
        $("#allocated-staff").val(equipment.staffId);
        $("#allocated-field").val(equipment.fieldCode);
    }).catch((error) => {
        console.error("Failed to load equipment: " + error);
    });
}


$("staff-table-body").on("click", ".view-equipment-btn", (event) => {
    targetEquipmentId = event.target.getAttribute("data-id");
    loadDataToSaveStaff();
    loadDataToSaveField();
    loadDataToupdate();
    popup.style.display = "flex";
});

//delete button function for equipment
$("#staff-table-body").on("click", ".delete-equipment-btn", (event) => {
    const equipmentId = event.target.getAttribute("data-id");

    if (confirm("Are you sure you want to delete this equipment?")) {
        deleteEquipment(equipmentId).then(() => {
            loadTable();
            alert("Equipment deleted successfully!");
        }).catch((error) => {
            console.error("Failed to delete equipment: " + error);
            alert("Failed to delete equipment. Please try again.");
        });
    }
});

//edit button function for equipment
$("staff-table-body").on("click", ".view-equipment-btn", (event) => {
    targetEquipmentId = event.target.getAttribute("data-id");
    loadDataToSaveStaff();
    loadDataToSaveField();
    loadDataToupdate();
    popup.style.display = "flex";

    $("#saveButton").hide();
    $("#updateButton").show();
    $("#deleteButton").show();
});


function resetFormForNewEntry() {
    // Reset the form
    $("#equipment-name, #equipment-type, #status, #allocated-field, #allocated-staff").val('');
    
    // Show save button and hide update/delete buttons
    $("#saveButton").show();
    $("#updateButton, #deleteButton").hide();
}

// Modify existing event listeners to manage button visibility
openPopup.addEventListener('click', () => {
    popup.style.display = 'flex';
    resetFormForNewEntry();
});

//delete button function for equipment
$("deleteButton").click(() => {
    if (confirm("Are you sure you want to delete this equipment?")) {
        deleteEquipment(targetEquipmentId).then(() => {
            loadTable();
            alert("Equipment deleted successfully!");
        }).catch((error) => {
            console.error("Failed to delete equipment: " + error);
            alert("Failed to delete equipment. Please try again.");
        });
    }
});

//view button function for equipment
$("#staff-table-body").on("click", ".view-equipment-btn", (event) => {
    targetEquipmentId = event.target.getAttribute("data-id");
    loadDataToSaveStaff();
    loadDataToSaveField();
    loadDataToupdate();
    popup.style.display = "flex";

    $("#saveButton").hide();
    $("#updateButton").show();
    $("#deleteButton").show();
});

// Search functionality for equipment management table
$(document).ready(function() {
    // Get references to the search input and equipment table body
    const searchInput = $('#Search');
    const equipmentTableBody = $('#staff-table-body');

    // Add event listener for input in the search field
    searchInput.on('input', function() {
        // Get the current search term and convert to lowercase
        const searchTerm = $(this).val().toLowerCase().trim();

        // Get all table rows
        const rows = equipmentTableBody.find('tr');

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
            const columnCount = equipmentTableBody.find('tr:first td').length;
            equipmentTableBody.append(`
                <tr class="no-results">
                    <td colspan="${columnCount}" class="text-center">
                        No equipment found matching your search.
                    </td>
                </tr>
            `);
        } else {
            // Remove any existing no results message
            equipmentTableBody.find('.no-results').remove();
        }
    });
});
