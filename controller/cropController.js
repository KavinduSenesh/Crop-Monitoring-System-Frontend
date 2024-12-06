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
