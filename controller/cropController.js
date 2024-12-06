import { getAllCrops } from "../model/cropModel.js";

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

function loadTable() {
    const table = $("#staff-table-body");
    table.empty();

    getAllCrops().then((crops) => {
        crops.forEach((crop) => {
            const row = `<tr>
                <td>${crop.cropCommonName}</td>
                <td>${crop.cropScientificName}</td>
                <td>${crop.category}</td>
                <td>${crop.cropSeason}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-sm btn-primary view-crop-btn" data-id="${crop.cropCode}">View</button>
                        <button class="btn btn-sm btn-danger delete-crop-btn" data-id="${crop.cropCode}">Delete</button>
                    </div>
                </td>
            </tr>`;
            table.append(row);
        });
    }).catch((error) => {
        console.error("Failed to load crops: " + error);
    });
}

$(document).ready(() => {
    loadTable();
});

$("#saveButton").click(() => {
    const cropName = $("#crop-name").val();
    const scientificName = $("#crop-scientific-name").val();
    const category = $("#Category").val();
    const season = $("#season").val();
    const fieldCode = $("#field-code").val();
    const cropImageFile = $("#cropImage")[0].files[0]; // Get the selected image file
    const monitoringLog = $("#")

    // Validate image selection
    if (!cropImageFile) {
        alert("Please upload a crop image!");
        return;
    }

    // Create FormData object to include both text and file data
    const formData = new FormData();
    formData.append("crop_common_name", cropName);
    formData.append("crop_scientific_name", scientificName);
    formData.append("category", category);
    formData.append("crop_season", season);
    formData.append("fieldCode", fieldCode);
    formData.append("field_code", cropImageFile); // Attach the image file

    // Call saveCrop API with FormData
    save(formData).then(() => {
        loadTable();

        alert("Crop saved successfully with image!");
    }).catch((error) => {
        console.log("Failed to save crop: " + error);
    });
});

//load field 
function loadDataToSave(){
    const fieldCode = $("#field-code");
}





































// Function to handle image preview
function handleImagePreview() {
    const fileInput = document.getElementById('cropImage');
    const imagePreview = document.getElementById('imagePreview');
    
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        
        if (file) {
            // Check if the file is an image
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                fileInput.value = '';
                imagePreview.style.display = 'none';
                return;
            }

            // Check file size (limit to 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                fileInput.value = '';
                imagePreview.style.display = 'none';
                return;
            }

            const reader = new FileReader();
            
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
            };
            
            reader.onerror = function() {
                alert('Error loading image');
                imagePreview.style.display = 'none';
            };
            
            reader.readAsDataURL(file);
        } else {
            imagePreview.style.display = 'none';
        }
    });

    // Reset preview when form is reset
    document.getElementById('cropForm').addEventListener('reset', function() {
        imagePreview.style.display = 'none';
        imagePreview.src = '#';
    });
}

// Initialize image preview functionality when document is ready
$(document).ready(function() {
    handleImagePreview();
});