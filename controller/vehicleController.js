
// dashboard page
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

// popup form
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


// Vehicle Management Controller
$(document).ready(function () {
    // Sample vehicle data (in a real application, this would come from a backend)
    const vehicleData = [
        {
            vehicleCode: "VH-001",
            licensePlateNumber: "ABC-1234",
            vehicleCategory: "Car",
            fuelType: "Petrol",
            status: "Available",
            remarks: "No issues",
            staffId: "ST-001"
        },
        {
            vehicleCode: "VH-002",
            licensePlateNumber: "DEF-5678",
            vehicleCategory: "Truck",
            fuelType: "Diesel",
            status: "In Maintenance",
            remarks: "Oil leakage",
            staffId: "ST-002"
        }
    ];

    // Function to populate the vehicle table
    function populateVehicleTable() {
        const tableBody = $("#staff-table-body"); // ID remains the same as per the requirement
        tableBody.empty();

        vehicleData.forEach(vehicle => {
            const row = `
                <tr data-staff-id="${vehicle.vehicleCode}">
                    <td>${vehicle.licensePlateNumber}</td>
                    <td>${vehicle.vehicleCategory}</td>
                    <td>${vehicle.fuelType}</td>
                    <td>${vehicle.status}</td>
                    <td>${vehicle.remarks}</td>
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
    populateVehicleTable();

    // Open Popup Button
    $("#openPopup").on("click", function () {
        $("#popup").css("display", "flex");
        // Reset form
        $("#staffForm")[0].reset();
        // Show/hide appropriate buttons
        $("#saveButton").show();
        $("#updateButton, #deleteButton").hide();
    });

    // Close Popup Button
    $("#closePopup, #cancelButton").on("click", function () {
        $("#popup").hide();
    });

    // View Vehicle Button (in table)
    $(document).on("click", ".view-staff-btn", function () {
        const vehicleCode = $(this).closest("tr").data("staff-id");
        const vehicle = vehicleData.find(v => v.vehicleCode === vehicleCode);

        if (vehicle) {
            // Populate form with vehicle details
            $("#vehicle-code").val(vehicle.vehicleCode); // Keep ID as is
            $("#License-plate-number").val(vehicle.licensePlateNumber); // Keep ID as is
            $("#Vehicle-Category").val(vehicle.vehicleCategory); // Keep ID as is
            $("#Fuel-Type").val(vehicle.fuelType); // Keep ID as is
            $("#status").val(vehicle.status); // Keep ID as is
            $("#Remarks").val(vehicle.remarks); // Keep ID as is
            $("#allocated-staff").val(vehicle.staffId); // Keep ID as is

            // Show popup
            $("#popup").css("display", "flex");

            // Show update/delete buttons, hide save
            $("#updateButton").show();
            $("#saveButton, #deleteButton").hide();
        }
    });

    // Delete Vehicle Button (in table)
    $(document).on("click", ".delete-staff-btn", function () {
        const vehicleCode = $(this).closest("tr").data("staff-id");
        const index = vehicleData.findIndex(v => v.vehicleCode === vehicleCode);

        if (index !== -1) {
            // Remove from array
            vehicleData.splice(index, 1);
            // Repopulate table
            populateVehicleTable();
        }
    });

    // Save New Vehicle
    $("#saveButton").on("click", function () {
        const newVehicle = {
            vehicleCode: $("#firstName").val(),
            licensePlateNumber: $("#lastName").val(),
            vehicleCategory: $("#designation").val(),
            fuelType: $("#gender").val(),
            status: $("#dob").val(),
            remarks: $("#joinedDate").val(),
            staffId: $("#address-line-1").val()
        };

        vehicleData.push(newVehicle);
        populateVehicleTable();
        $("#popup").hide();
    });

    // Update Vehicle
    $("#updateButton").on("click", function () {
        const vehicleCode = $("tr[data-staff-id]").data("staff-id");
        const vehicleIndex = vehicleData.findIndex(v => v.vehicleCode === vehicleCode);

        if (vehicleIndex !== -1) {
            vehicleData[vehicleIndex] = {
                vehicleCode: $("#firstName").val(),
                licensePlateNumber: $("#lastName").val(),
                vehicleCategory: $("#designation").val(),
                fuelType: $("#gender").val(),
                status: $("#dob").val(),
                remarks: $("#joinedDate").val(),
                staffId: $("#address-line-1").val()
            };

            populateVehicleTable();
            $("#popup").hide();
        }
    });

    // Search functionality
    $(".search_input").on("keyup", function () {
        const searchTerm = $(this).val().toLowerCase();

        $("#staff-table-body tr").filter(function () {
            $(this).toggle(
                $(this).text().toLowerCase().indexOf(searchTerm) > -1
            );
        });
    });
});


