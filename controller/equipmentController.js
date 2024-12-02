
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


