import { getAll } from "../model/VehicleModel.js";



// Fetch vehicles and process data
getAll().then((vehicles) => {
    $(".vehicle-count h1").text(vehicles.length);

    // Calculate available and unavailable vehicles based on 'status'
    const availableVehicles = vehicles.filter((vehicle) => vehicle.status === "AVALABLE").length;
    const unavailableVehicles = vehicles.length - availableVehicles;

    // Initialize the pie chart with dynamic vehicle data
    initPieChart(availableVehicles, unavailableVehicles);

});

function initPieChart(availableCount, unavailableCount) {
    const ctx = document.getElementById("myPieChart").getContext("2d");

    const data = {
        labels: ["Available Vehicles", "Unavailable Vehicles"],
        datasets: [
            {
                data: [availableCount, unavailableCount],
                backgroundColor: ["rgba(116,234,120,0.8)", "rgba(248,120,131,0.8)"],
                borderColor: ["rgba(116,234,120,1)", "rgba(248,120,131,1)"],
                borderWidth: 1,
            },
        ],
    };

    new Chart(ctx, {
        type: "pie",
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const label = tooltipItem.label || "";
                            const value = tooltipItem.raw;
                            const total = tooltipItem.dataset.data.reduce((acc, val) => acc + val, 0);
                            const percentage = ((value / total) * 100).toFixed(2);
                            return `${label}: ${value} (${percentage}%)`;
                        },
                    },
                },
            },
        },
    });
}



$("#logout-btn").on("click", () => {
    if(confirm("Are you sure want to LogOut?")){
      window.location = "manager/loginpage.html"; 
    }
  });

