import { getCookie } from "./TokenModel.js";

export function saveField(fieldFormData) {
  return new Promise((resolve, reject) => {
      $.ajax({
          url: "http://localhost:5055/crop-monitor/api/v1/field",
          type: "POST",
          headers: {
            Authorization: "Bearer " + getCookie("authToken"), // Ensure token is valid
          }, // HTTP method
          data: fieldFormData,
          processData: false, // Prevents jQuery from automatically processing the data
          contentType: false, // Prevents jQuery from setting Content-Type (required for FormData)
          success: function (response) {
              console.log('Hello');
              resolve(true);
          },
          error: function (xhr) {
              console.error('Request failed with status:', xhr.status);
              reject(false);
          }
      });
  });
}

export function updateField(fieldFormData) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:5055/crop-monitor/api/v1/field",
            type: "PATCH",
            headers: {
              Authorization: "Bearer " + getCookie("authToken"), // Ensure token is valid
            }, // HTTP method
            data: fieldFormData,
            processData: false, // Prevents jQuery from automatically processing the data
            contentType: false, // Prevents jQuery from setting Content-Type (required for FormData)
            success: function (response) {
                console.log('Hello');
                resolve(true);
            },
            error: function (xhr) {
                console.error('Request failed with status:', xhr.status);
                reject(false);
            }
        });
    });
  }


export function getAll() {
  return new Promise((resolve, reject) => {
      $.ajax({
          url: "http://localhost:5055/crop-monitor/api/v1/field",
          type: "GET",
          headers: {
            Authorization: "Bearer " + getCookie("authToken"), // Ensure token is valid
          }, // HTTP method
          dataType: "json",
          success: function (response) {
              console.log(response);
              resolve(response);
          },
          error: function (xhr) {
              console.error('Request failed with status:', xhr.status);
              reject("Request failed with status:", xhr.status);
          }
      });
  });
}

export function deleteField(fieldCode) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `http://localhost:5055/crop-monitor/api/v1/field/${fieldCode}`, // Field-specific URL
        type: "DELETE",
        headers: {
          Authorization: "Bearer " + getCookie("authToken"), // Ensure token is valid
        }, // HTTP method
        success: function (response) {
          console.log('Field deleted successfully:', response);
          resolve(true); // Resolve the promise
        },
        error: function (xhr) {
          console.error('Delete request failed with status:', xhr.status);
          reject(false); // Reject the promise
        }
      });
    });
  }
  
