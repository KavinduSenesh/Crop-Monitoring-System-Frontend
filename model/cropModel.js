import { getCookie } from "./tokenModel.js";

export function getAllCrops(){
    return new Promise((resolve, reject) => {
        $.ajax({
            url : "http://localhost:5055/greenShadow/api/v1/crop",
            type : "GET",
            headers: {
                Authorization: "Bearer " + getCookie("authToken")
            },
            dataType: "json", // Automatically parses JSON response
            success: function(response){
                console.log("Crops fetched successfully:", response);
                resolve(response);
            },
            error: function(xhr, status, error){
                console.error("Error fetching Crop:", error); // Log error
                reject(error);
            },
        })
    })
}

// export function saveCrop(crop, field_code) {
//     return new Promise((resolve, reject) => {
//         $.ajax({
//             url: "http://localhost:5055/greenshadow/api/v1/crop?FieldCode="+field_code,
//             type: "POST",
//             headers: {
//                 Authorization: "Bearer " + getCookie("authToken"), // Include token if required
//             },
//             data: crop, // FormData object
//             processData: false, // Prevent processing FormData
//             contentType: false, // Let the browser set the correct Content-Type
//             success: function (result) {
//                 resolve(result); // Resolve on success
//             },
//             error: function (xhr, status, error) {
//                 reject(xhr.responseText || error); // Provide error details
//             },
//         });
//     });
// }

// export function getCrop(id){
//     return new Promise((resolve, reject) => {
//         $.ajax({
//             url : "http://localhost:5055/greenshadow/api/v1/crop/"+id,
//             type : "GET",
//             headers: {
//                 Authorization: "Bearer " + getCookie("authToken")
//             },
//             success: function(result){
//                 resolve(result);
//             },
//             error: function(xhr, status, error){
//                 reject(error);
//             },
//         })
//     })
// }

// export function updateCrop(cropCode, formData) {
//     return new Promise((resolve, reject) => {
//         $.ajax({
//             url: `http://localhost:5055/greenshadow/api/v1/crop/${cropCode}`,
//             type: "PATCH",
//             headers: {
//               Authorization: "Bearer " + getCookie("authToken"),
//             },
//             data: formData,
//             processData: false, // Prevent jQuery from processing the data
//             contentType: false, // Let the browser set the Content-Type
//             success: function(result) {
//                 resolve(result);
//             },
//             error: function(xhr, status, error) {
//                 reject(xhr.responseText || error);
//             }
//         });
//     });
// }

// export function deleteCrop(cropCode){
//     return new Promise((resolve, reject) => {
//         $.ajax({
//             url : `http://localhost:5055/greenshadow/api/v1/crop/${cropCode}`,
//             type : "DELETE",
//             headers: {
//                 Authorization: "Bearer " + getCookie("authToken")
//             },
//             success: function(result){
//                 resolve(result);
//             },
//             error: function(xhr, status, error){
//                 reject(error);
//             },
//         })
//     })
// }