//dashboard
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

// getAll().then((equimpent) => {
//     console.log("Staff members:", equimpen);
//     reloadTable(equimpent);
// });

$(document).ready(function() {
    // Sample crop data (in a real application, this would come from a backend)
    const cropData = [
        {
            cropCode: "CR001",
            cropCommonName: "Tomato",
            cropScientificName: "Solanum lycopersicum",
            category: "Vegetable",
            cropSeason: "Summer",
            // fieldCode: "FIELD01"
        },
        {
            cropCode: "CR002",
            cropCommonName: "Wheat",
            cropScientificName: "Triticum aestivum",
            category: "Grain",
            cropSeason: "Winter",
            // fieldCode: "FIELD02"
        }
    ];

    // <td>${crop.fieldCode}</td>

    // Function to populate the crop table
    function populateCropTable() {
        const tableBody = $("#staff-table-body");
        tableBody.empty();

        cropData.forEach(crop => {
            const row = `
                <tr data-crop-id="${crop.cropCode}">
                    <td>${crop.cropCommonName}</td>
                    <td>${crop.cropScientificName}</td>
                    <td>${crop.category}</td>
                    <td>${crop.cropSeason}</td>
                   
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-sm btn-primary view-equipment-btn">View</button>
                            <button class="btn btn-sm btn-danger delete-equipment-btn">Delete</button>
                        </div>
                    </td>
                </tr>
            `;
            tableBody.append(row);
        });
    }

    // Initial table population
    populateCropTable();

    // Open Popup Button
    $("#openPopup").on("click", function() {
        $("#popup").css("display", "flex");
        // Reset form
        $("#cropForm")[0].reset();
        // Show/hide appropriate buttons
        $("#saveButton").show();
        $("#updateButton, #deleteButton").hide();
    });

    // Close Popup Button
    $("#closePopup, #cancelButton").on("click", function() {
        $("#popup").hide();
    });

    // View Crop Button (in table)
    $(document).on("click", ".view-equipment-btn", function() {
        const cropCode = $(this).closest("tr").data("crop-id");
        const crop = cropData.find(c => c.cropCode === cropCode);

        if (crop) {
            // Populate form with crop details
            $("#crop-code").val(crop.cropCode);
            $("#crop-name").val(crop.cropCommonName);
            $("#crop-scientific-name").val(crop.cropScientificName);
            $("#Category").val(crop.category);
            $("#season").val(crop.cropSeason);
            $("#field-code").val(crop.fieldCode);

            // Show popup
            $("#popup").css("display", "flex");

            // Show update/delete buttons, hide save
            $("#updateButton").show();
            $("#saveButton, #deleteButton").hide();
        }
    });

    // Delete Crop Button (in table)
    $(document).on("click", ".delete-equipment-btn", function() {
        const cropCode = $(this).closest("tr").data("crop-id");
        const index = cropData.findIndex(c => c.cropCode === cropCode);

        if (index !== -1) {
            // Remove from array
            cropData.splice(index, 1);
            // Repopulate table
            populateCropTable();
        }
    });

    // Save New Crop
    $("#saveButton").on("click", function() {
        const newCrop = {
            cropCode: `CR${String(cropData.length + 1).padStart(3, '0')}`,
            cropCommonName: $("#crop-name").val(),
            cropScientificName: $("#crop-scientific-name").val(),
            category: $("#Category").val(),
            cropSeason: $("#season").val(),
            fieldCode: $("#field-code").val()
        };

        cropData.push(newCrop);
        populateCropTable();
        $("#popup").hide();
    });

    // Update Crop
    $("#updateButton").on("click", function() {
        const cropCode = $("tr[data-crop-id]").data("crop-id");
        const cropIndex = cropData.findIndex(c => c.cropCode === cropCode);

        if (cropIndex !== -1) {
            cropData[cropIndex] = {
                cropCode: cropCode,
                cropCommonName: $("#crop-name").val(),
                cropScientificName: $("#crop-scientific-name").val(),
                category: $("#Category").val(),
                cropSeason: $("#season").val(),
                fieldCode: $("#field-code").val()
            };

            populateCropTable();
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

    // Image Upload Preview
    $('#cropImage').on('change', function(event) {
        const file = event.target.files[0];
        const imagePreview = $('#imagePreview');
        
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                imagePreview.attr('src', e.target.result);
                imagePreview.show();
            }
            
            reader.readAsDataURL(file);
        } else {
            imagePreview.hide();
        }
    });
});

// Close popup when clicking outside of it
// $(document).on("click", function(event) {
//     if (!$(event.target).closest("#popup, #openPopup").length) {
//         $("#popup").hide();
//     }
// });