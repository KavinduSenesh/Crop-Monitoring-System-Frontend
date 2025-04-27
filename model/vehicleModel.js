import { getCookie } from "./TokenModel.js";

export function getAll() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:5055/crop-monitor/api/v1/vehicle",
      type: "GET",
      headers: {
        Authorization: "Bearer " + getCookie("authToken"), // Ensure token is valid
      }, // HTTP method
      success: (data) => {
        console.log(data);
        resolve(data);
      },
      error: (jqXHR, textStatus, errorThrown) => {
        reject(`Request failed: ${textStatus}, ${errorThrown}`);
      },
    });
  });
}

export function save(vehicle) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:5055/crop-monitor/api/v1/vehicle",
      type: "POST",
      headers: {
        Authorization: "Bearer " + getCookie("authToken"), // Ensure token is valid
      }, // HTTP method
      contentType: "application/json",
      data: JSON.stringify(vehicle),
      success: (response) => {
        console.log("Vehicle saved successfully:", response);
        resolve(response);
      },
      error: (jqXHR, textStatus, errorThrown) => {
        reject(`Save failed: ${textStatus}, ${errorThrown}`);
      },
    });
  });
}

export function deleteVehicle(vehicleCode) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/crop-monitor/api/v1/vehicle/${vehicleCode}`, // Use the vehicleCode in the URL
      type: "DELETE", // Specify the request type as DELETE
      headers: {
        Authorization: "Bearer " + getCookie("authToken"), // Ensure token is valid
      }, // HTTP method
      success: (response) => {
        console.log("Vehicle deleted successfully:", response);
        resolve(response); // Resolves the promise with the server's response
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.error(
          `Failed to delete vehicle: ${textStatus}, ${errorThrown}`
        );
        reject(`Delete failed: ${jqXHR.status}, ${errorThrown}`);
      },
    });
  });
}

export function updateVehicle(vehicleCode, updatedData) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `http://localhost:5055/crop-monitor/api/v1/vehicle/${vehicleCode}`, // Use the vehicleCode in the URL
        type: "PATCH", // Specify the request type as PUT for updating
        headers: {
          Authorization: "Bearer " + getCookie("authToken"), // Ensure token is valid
        }, // HTTP method
        contentType: "application/json", // Set content type to JSON
        data: JSON.stringify(updatedData), // Send the updated data as JSON
        success: (response) => {
          console.log("Vehicle updated successfully:", response);
          resolve(response); // Resolves the promise with the server's response
        },
        error: (jqXHR, textStatus, errorThrown) => {
          console.error(
            `Failed to update vehicle: ${textStatus}, ${errorThrown}`
          );
          reject(`Update failed: ${jqXHR.status}, ${errorThrown}`);
        },
      });
    });
  }
  
  