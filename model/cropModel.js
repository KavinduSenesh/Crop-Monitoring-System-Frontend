import { getCookie } from "./TokenModel.js";

export function getAll() {
  console.log(getCookie("authToken"));
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:5055/crop-monitor/api/v1/crop", // API endpoint
      type: "GET",
      headers: {
        Authorization: "Bearer " + getCookie("authToken"), // Ensure token is valid
      }, // HTTP method
      success: (response) => {
        console.log(response); // Log the response
        resolve(response); // Resolve the promise with the response
      },
      error: (jqXHR, textStatus, errorThrown) => {
        reject(new Error(`Failed to fetch crops: ${textStatus} - ${errorThrown}`)); // Reject the promise with an error
      },
    });
  });
}

export function deleteCrop(cropCode) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/crop-monitor/api/v1/crop/${cropCode}`, // API endpoint with cropCode
      type: "DELETE", // HTTP method
      headers: {
        Authorization: "Bearer " + getCookie("authToken"), // Ensure token is valid
      }, // HTTP method
      success: () => {
        resolve("Crop deleted successfully"); // Resolve the promise on success
      },
      error: (jqXHR, textStatus, errorThrown) => {
        reject(new Error(`Failed to delete crop: ${textStatus} - ${errorThrown}`)); // Reject the promise with an error
      },
    });
  });
}

export function saveCrop(formData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:5055/crop-monitor/api/v1/crop", // API endpoint
      type: "POST", // HTTP method
      headers: {
        Authorization: "Bearer " + getCookie("authToken"), // Ensure token is valid
      }, // HTTP method
      processData: false, // Prevent jQuery from transforming the data into a query string
      contentType: false, // Let the browser set the correct Content-Type header
      data: formData, // Send the FormData object
      success: (response) => {
        resolve(response); // Resolve the promise with the response
      },
      error: (jqXHR, textStatus, errorThrown) => {
        reject(new Error(`Failed to save crop: ${textStatus} - ${errorThrown}`)); // Reject the promise with an error
      },
    });
  });
}

export function getCrop(cropCode) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/crop-monitor/api/v1/crop/${cropCode}`, // API endpoint with cropCode
      type: "GET", // HTTP method
      headers: {
        Authorization: "Bearer " + getCookie("authToken"), // Ensure token is valid
      }, // HTTP method
      success: (response) => {
        console.log("Crop details retrieved successfully:", response); // Log the response
        resolve(response); // Resolve the promise with the response
      },
      error: (jqXHR, textStatus, errorThrown) => {
        reject(new Error(`Failed to fetch crop: ${textStatus} - ${errorThrown}`)); // Reject the promise with an error
      },
    });
  });
}

export function updateCrop(cropCode, formData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/crop-monitor/api/v1/crop/${cropCode}`, // API endpoint with cropCode
      type: "PATCH", // HTTP method for partial updates
      headers: {
        Authorization: "Bearer " + getCookie("authToken"), // Ensure token is valid
      }, // HTTP method
      processData: false, // Prevent jQuery from processing the data
      contentType: false, // Ensure the correct Content-Type header
      data: formData, // Send FormData directly
      success: (response) => {
        console.log("Crop updated successfully:", response); // Log the response
        resolve("Crop updated successfully!"); // Resolve the promise with a success message
      },
      error: (jqXHR, textStatus, errorThrown) => {
        reject(new Error(`Failed to update crop: ${textStatus} - ${errorThrown}`)); // Reject the promise with an error
      },
    });
  });
}
