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

$("#add-field-button").on("click", () => {
    $("#add-field-modal").addClass("show");
});

$(".btn-close").on("click", () => {
    $("#add-field-modal").removeClass("show");
});

$(window).on("click", (event) => {
    if ($(event.target).is("#add-field-modal")) {
      $("#add-field-modal").css("display", "none");
    }
});

$("#file-input-1").on("change", (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            $("#image-1-preview").attr("src", e.target.result).fadeIn();
        };
        reader.readAsDataURL(file);
    }
});

$("#file-input-2").on("change", (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            $("#image-2-preview").attr("src", e.target.result).fadeIn();
        };
        reader.readAsDataURL(file);
    }
});