import { 
    getAllVehiceles
    // getAllVehicles, 
    // createVehicle, 
    // updateVehicle, 
    // deleteVehicle 
} from "../model/VehicleModel.js";

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

// Fetch and populate vehicle table
// async function getAllVehicl() {
//     try {
//         const response = await fetch('http://localhost:5055/greenShadow/api/v1/vehicle');
        
//         if (!response.ok) {
//             throw new Error('Failed to fetch vehicles');
//         }
        
//         const vehicleList = await response.json();

//         populateVehicleTable(vehicleList);
//     } catch (error) {
//         console.error('Error fetching vehicles:', error);
//         displayErrorInTable('Failed to load vehicles');
//     }
// }

// function populateVehicleTable(vehicleList) {
//     const tableBody = document.getElementById('vehicle-table-body');
//     tableBody.innerHTML = '';

//     vehicleList.forEach(vehicle => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${vehicle.licensePlateNumber}</td>
//             <td>${vehicle.vehicleCategory}</td>
//             <td>${vehicle.fuelType}</td>
//             <td>${vehicle.status}</td>
//             <td>${vehicle.remarks}</td>
//             <td>
//                 <div class="action-buttons">
//                     <button class="btn btn-sm btn-primary view-vehicle-btn" data-id="${vehicle.vehicleId}">View</button>
//                     <button class="btn btn-sm btn-danger delete-vehicle-btn" data-id="${vehicle.vehicleId}">Delete</button>
//                 </div>
//             </td>
//         `;
//         tableBody.appendChild(row);
//     });

//     addActionButtonListeners();
// }

// function addActionButtonListeners() {
//     document.querySelectorAll('.view-vehicle-btn').forEach(button => {
//         button.addEventListener('click', function() {
//             const vehicleId = this.getAttribute('data-id');
//             // openUpdatePopup(vehicleId);

//         $("#popup").css("display", "flex");
        
//         // Hide save and delete buttons
//         $("#saveButton, #deleteButton").hide();
        
//         // Show update button
//         $("#updateButton").show();

//         // Disable all form inputs to make it read-only
//         // $("#staffForm input, #staffForm select").prop('disabled', false);
        
//         openUpdatePopup(staffId);

//         targetVehicleId = vehicleId;
//         });
//     });

//     document.querySelectorAll('.delete-vehicle-btn').forEach(button => {
//         button.addEventListener('click', function() {
//             const vehicleId = this.getAttribute('data-id');
//             confirmDeleteVehicle(vehicleId);
//         });
//     });
// }

// function openUpdatePopup(vehicleId) {
//     const popup = document.getElementById('popup');
//     popup.style.display = 'flex';

//     // Fetch specific staff details to pre-fill the form
//     fetchStaffDetails(vehicleId);
// }

// async function fetchVehicleDetails(vehicleId) {
//     try {
//         const response = await fetch(`http://localhost:5055/greenShadow/api/v1/vehicle/${vehicleId}`);
        
//         if (!response.ok) {
//             throw new Error('Failed to fetch vehicle details');
//         }
        
//         const vehicleDetails = await response.json();
        
//         // Populate form fields
//         document.getElementById('vehicle-code').value = vehicleDetails.vehicleCode;
//         document.getElementById('License-plate-number').value = vehicleDetails.licensePlateNumber;
//         document.getElementById('Vehicle-Category').value = vehicleDetails.vehicleCategory;
//         document.getElementById('Fuel-Type').value = vehicleDetails.fuelType;
//         document.getElementById('status').value = vehicleDetails.status;
//         document.getElementById('Remarks').value = vehicleDetails.remarks;
//         document.getElementById('allocated-staff').value = vehicleDetails.allocatedStaff;
//     } catch (error) {
//         console.error('Error fetching vehicle details:', error);
//         alert('Failed to load vehicle details');
//     }
// }

// async function confirmDeleteVehicle(vehicleId) {
//     if (confirm('Are you sure you want to delete this vehicle?')) {
//         try {
//             await deleteVehicle(vehicleId);

//             getAllVehiceles();
//             alert('Vehicle deleted successfully');
//         } catch (error) {
//             console.error('Error deleting vehicle:', error);
//             alert('Failed to delete vehicle');
//         }
//     }
// }

// async function saveVehicleMember(event) {
//     event.preventDefault();

//     const vehicleForm = document.getElementById('staffForm');
//     const formData = new FormData(vehicleForm);

//     const vehicleData = {
//         // vehicleCode: formData.get('vehicle-code'),
//         licensePlateNumber: formData.get('License-plate-number'),
//         vehicleCategory: formData.get('Vehicle-Category'),
//         fuelType: formData.get('Fuel-Type'),
//         status: formData.get('status'),
//         remarks: formData.get('Remarks'),
//         allocatedStaff: formData.get('allocated-staff')
//     }

//     try {
//         const response = await fetch('http://localhost:5055/greenShadow/api/v1/vehicle', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(vehicleData)
//         });

//         if (!response.ok) {
//             throw new Error('Failed to save vehicle');
//         }

//         getAllVehiceles();
//         alert('Vehicle saved successfully');

//         const popup = document.getElementById('popup');
//         popup.style.display = 'none';
//     } catch (error) {
//         console.error('Error saving vehicle:', error);
//         alert('Failed to save vehicle');
//     }
// }



// function updateVehicleMember() {
//     const vehicleId = document.querySelector('#staffForm input[name="vehicleId"]')?.value;
    
//     const vehicleData = {
//         vehicleCode: document.getElementById('vehicle-code').value,
//         licensePlateNumber: document.getElementById('License-plate-number').value,
//         vehicleCategory: document.getElementById('Vehicle-Category').value,
//         fuelType: document.getElementById('Fuel-Type').value,
//         status: document.getElementById('status').value,
//         remarks: document.getElementById('Remarks').value,
//         allocatedStaff: document.getElementById('allocated-staff').value
//     };

//     updateVehicle(vehicleId, vehicleData)
//         .then(() => {
//             getAllVehicleMembers();
//             alert('Vehicle updated successfully');
//             popup.style.display = 'none';
//         })
//         .catch(error => {
//             console.error('Error updating vehicle:', error);
//             alert(`Failed to update vehicle: ${error.message}`);
//         });
// }

// function resetFormForNewEntry() {
//     document.getElementById('staffForm').reset();
//     $("#updateButton, #deleteButton").hide();
//     $("#saveButton").show();
// }

// function performVehicleSearch() {
//     const searchTerm = document.querySelector('.search_input').value.toLowerCase().trim();
//     const tableRows = document.querySelectorAll('#staff-table-body tr');
    
//     let visibleRowCount = 0;
    
//     tableRows.forEach(row => {
//         const cellsText = Array.from(row.querySelectorAll('td'))
//             .map(cell => cell.textContent.toLowerCase())
//             .join(' ');
        
//         if (cellsText.includes(searchTerm)) {
//             row.style.display = '';
//             visibleRowCount++;
//         } else {
//             row.style.display = 'none';
//         }
//     });
// }

// document.addEventListener('DOMContentLoaded', () => {
//     getAllVehicleMembers();

//     document.getElementById('saveButton').addEventListener('click', saveVehicleMember);
//     document.getElementById('updateButton').addEventListener('click', updateVehicleMember);
    
//     const searchInput = document.querySelector('.search_input');
//     searchInput.addEventListener('input', performVehicleSearch);
//     searchInput.addEventListener('keyup', performVehicleSearch);
// });

// // export { 
// //     getAllVehiceles, 
// //     populateStaffTable, 
// //     openUpdatePopup, 
// //     confirmDeleteStaff 
// // };