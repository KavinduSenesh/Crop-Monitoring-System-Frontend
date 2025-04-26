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

