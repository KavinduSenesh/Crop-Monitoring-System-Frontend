// export function getAllVehiceles(){
//     return new Promise((resolve, reject) => {
//         $.ajax({
//             url: "http://localhost:5055/greenShadow/api/v1/vehicle",
//             type: "GET",
//             dataType: "json", // Automatically parses JSON response
//             success: (response) => {
//                 console.log("Vehicles fetched successfully:", response);
//                 resolve(response);
//             },
//             error: (xhr, status, error) => {
//                 console.error("Error fetching Vehicle:", error); // Log error
//                 reject(error); // Reject promise with error
//             }
//         });
//     });
// }

// export function saveVehicle(vehicleData){
//     return new Promise((resolve, reject) => {
//         $.ajax({
//             url: "http://localhost:5055/greenShadow/api/v1/vehicle",
//             type: "POST",
//             contentType: "application/json",
//             data: JSON.stringify(vehicleData),
//             success: (response) => {
//                 console.log("Vehicle saved successfully:", response);
//                 resolve(response);
//             },
//             error: (jqXHR, textStatus, errorThrown) => {
//                 console.error(`Failed to save Vehicle: ${textStatus}, ${errorThrown}`);
//                 reject(`Request failed with status: ${jqXHR.status}`);
//             },
//         });
//     });
// }