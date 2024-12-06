import { deleteVehicle, getAllVehicles, getVehicle, saveVehicle, updateVehicle } from "../model/vehicleModel.js";
import { getAllStaff } from "../model/staffModel.js";

var targetVehicleId = null;

// Dashboard navigation setup
document.addEventListener("DOMContentLoaded", () => {
    const iconWrappers = document.querySelectorAll(".icon-wrapper");
    
    const navigationLinks = {
        "dashboard.png": "http://127.0.0.1:5502/pages/dashboard.html",
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
        const imageName = img.src.split("/").pop();
        const targetLink = navigationLinks[imageName];

        if (targetLink) {
            wrapper.addEventListener("click", () => {
                window.location.href = targetLink;
            });
        }
    });
});

// Popup form event listeners
const openPopup = document.getElementById('openPopup');
const closePopup = document.getElementById('closePopup');
const popup = document.getElementById('popup');

openPopup.addEventListener('click', () => {
    popup.style.display = 'flex';
    resetFormForNewEntry();
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


function loadTable(){
   const table = $("#vehicle-table-body")
    table.empty();

    getAllVehicles().then((vehicles) => {
        vehicles.forEach((vehicle) => {
            const row = `<tr>
                <td>${vehicle.licensePlateNumber}</td>
                <td>${vehicle.vehicleCategory}</td>
                <td>${vehicle.fuelType}</td>
                <td>${vehicle.status}</td>
                <td>${vehicle.remarks}</td>
                <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-primary view-vehicle-btn" data-id="${vehicle.vehicleCode}">View</button>
                    <button class="btn btn-sm btn-danger delete-vehicle-btn" data-id="${vehicle.vehicleCode}">Delete</button>
                </div>
            </td>
            </tr>`;
            table.append(row);
        });
    })
}

//load data to table
$(document).ready(() => {
    loadTable();
});

//save button function
$("#saveButton").click(() => {
    const licensePlateNumber = $("#License-plate-number").val();
    const vehicleCategory = $("#Vehicle-Category").val();
    const fuelType = $("#Fuel-Type").val();
    const status = $("#status").val();
    const remarks = $("#remarks").val();
    const allocatedStaff = $("#allocatedStaff").val();

    const vehicleData = {
        "licensePlateNumber": licensePlateNumber,
        "vehicleCategory": vehicleCategory ,
        "fuelType": fuelType ,
        "status": status, 
        "remarks":  remarks,
        "staffId": allocatedStaff
    };

    saveVehicle(vehicleData).then(() => {
        loadTable();

        alert("Vehicle saved successfully!");
    }).catch((error) => {
        console.log("Failed to save vehicle: " + error);
    });
});

//load staff ids
function loadDataToSave(){
    const staffCombo = $("#allocatedStaff")
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

$("#openPopup").click(() => {
    loadDataToSave();
});

//update button function
$("#updateButton").click(() => {
    const licensePlateNumber = $("#License-plate-number").val();
    const vehicleCategory = $("#Vehicle-Category").val();
    const fuelType = $("#Fuel-Type").val();
    const status = $("#status").val();
    const remarks = $("#remarks").val();
    const allocatedStaff = $("#allocatedStaff").val();

    const vehicleData = {
        "licensePlateNumber": licensePlateNumber,
        "vehicleCategory": vehicleCategory ,
        "fuelType": fuelType ,
        "status": status, 
        "remarks":  remarks,
        "staffId": allocatedStaff
    };


    updateVehicle(targetVehicleId, vehicleData, allocatedStaff).then(() => { 
        loadTable();
        alert("Vehicle updated successfully!");
    }).catch((error) => {
        console.log("Failed to update vehicle: " + error);
    });
});

function loadDataToupdate(){
    getVehicle(targetVehicleId).then((vehicle) => {
        $("#License-plate-number").val(vehicle.licensePlateNumber);
        $("#Vehicle-Category").val(vehicle.vehicleCategory);
        $("#Fuel-Type").val(vehicle.fuelType);
        $("#status").val(vehicle.status);
        $("#remarks").val(vehicle.remarks);
        $("#allocatedStaff").val(vehicle.staffId);
    }).catch((error) => {
        console.error("Failed to load vehicle: " + error);
    });
}

$("#vehicle-table-body").on("click", ".view-vehicle-btn", (event) => {
    targetVehicleId = event.target.getAttribute("data-id");
    loadDataToSave();
    loadDataToupdate();
    popup.style.display = 'flex';
});

//delete button function
$("#vehicle-table-body").on("click", ".delete-vehicle-btn", (event) => {
    const vehicleId = event.target.getAttribute("data-id");
    
    if (confirm("Are you sure you want to delete this vehicle?")) {
        deleteVehicle(vehicleId).then(() => {
            loadTable();
            alert("Vehicle deleted successfully!");
        }).catch((error) => {
            console.error("Failed to delete vehicle: " + error);
            alert("Failed to delete vehicle. Please try again.");
        });
    }
});


//edit button action
$("#vehicle-table-body").on("click", ".view-vehicle-btn", (event) => {
    targetVehicleId = event.target.getAttribute("data-id");
    loadDataToSave();
    loadDataToupdate();
    popup.style.display = 'flex';
    
    // Hide save button, show update and delete buttons
    $("#saveButton").hide();
    $("#updateButton, #deleteButton").show();
});

function resetFormForNewEntry() {
    // Reset the form
    $("#License-plate-number, #Vehicle-Category, #Fuel-Type, #status, #remarks, #allocatedStaff").val('');
    
    // Show save button and hide update/delete buttons
    $("#saveButton").show();
    $("#updateButton, #deleteButton").hide();
}

// Modify existing event listeners to manage button visibility
openPopup.addEventListener('click', () => {
    popup.style.display = 'flex';
    resetFormForNewEntry();
});

// Add delete button functionality
$("#deleteButton").click(() => {
    if (confirm("Are you sure you want to delete this vehicle?")) {
        deleteVehicle(targetVehicleId).then(() => {
            loadTable();
            popup.style.display = 'none';
            alert("Vehicle deleted successfully!");
        }).catch((error) => {
            console.error("Failed to delete vehicle: " + error);
            alert("Failed to delete vehicle. Please try again.");
        });
    }
});

//view button popup
$("#vehicle-table-body").on("click", ".view-vehicle-btn", (event) => {
    targetVehicleId = event.target.getAttribute("data-id");
    loadDataToSave();
    loadDataToupdate();
    popup.style.display = 'flex';
    
    // Hide save and delete buttons, show only update button
    $("#saveButton, #deleteButton").hide();
    $("#updateButton").show();
 });
 //view button popup


 // Search functionality for staff management table
$(document).ready(function() {
    // Get references to the search input and staff table body
    const searchInput = $('#Search');
    const vehicleTableBody = $('#vehicle-table-body');

    // Add event listener for input in the search field
    searchInput.on('input', function() {
        // Get the current search term and convert to lowercase
        const searchTerm = $(this).val().toLowerCase().trim();

        // Get all table rows
        const rows = vehicleTableBody.find('tr');

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
            const columnCount = vehicleTableBody.find('tr:first td').length;
            vehicleTableBody.append(`
                <tr class="no-results">
                    <td colspan="${columnCount}" class="text-center">
                        No vehicle found matching your search.
                    </td>
                </tr>
            `);
        } else {
            // Remove any existing no results message
            vehicleTableBody.find('.no-results').remove();
        }
    });
});
