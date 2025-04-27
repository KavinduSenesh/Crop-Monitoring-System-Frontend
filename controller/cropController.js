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

getAll();

$("#add-crop-button").on("click", () => {
    $("#add-crop-modal").addClass("show");
});

$(".btn-close").on("click", () => {
    $("#add-crop-modal").removeClass("show");
});

$(window).on("click", (event) => {
    if ($(event.target).is("#add-crop-modal")) {
      $("#add-crop-modal").css("display", "none");
    }
});

$("#file-input").on("change", (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            $("#image-preview").attr("src", e.target.result).fadeIn();
        };
        reader.readAsDataURL(file);
    }
});

let cropCode;

export function getAll() {
    getAllCrops()
    .then((crops) => {
        console.log(crops);
    })
}


  
  