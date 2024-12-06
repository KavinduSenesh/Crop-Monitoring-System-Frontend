import { getCookie } from "./tokenModel.js";

export function getAllVehicles(){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:5055/greenShadow/api/v1/vehicle",
            type: "GET",
            headers: {
              Authorization: "Bearer " + getCookie("authToken"),
            },
            dataType: "json", // Automatically parses JSON response
            success: (response) => {
                console.log("Vehicles fetched successfully:", response);
                resolve(response);
            },
            error: (xhr, status, error) => {
                console.error("Error fetching Vehicle:", error); // Log error
                reject(error); // Reject promise with error
            }
        });
    });
}

export function saveVehicle(vehicleData){
    console.log("Saving Vehicle:", vehicleData);
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:5055/greenShadow/api/v1/vehicle",
            type: "POST",
            headers: {
              Authorization: "Bearer " + getCookie("authToken"),
            },
            contentType: "application/json",
            data: JSON.stringify(vehicleData),
            success: (response) => {
                console.log("Vehicle saved successfully:", response);
                resolve(response);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.error(`Failed to save Vehicle: ${textStatus}, ${errorThrown}`);
                reject(`Request failed with status: ${jqXHR.status}`);
            },
        });
    });
}

export function getVehicle(id){
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `http://localhost:5055/greenShadow/api/v1/vehicle/${id}`,
        type: "GET",
        headers: {
          Authorization: "Bearer " + getCookie("authToken"),
        },
        contentType: "application/json",
        success: function (result) {
          resolve(result);
        },
        error: function (xhr, status, error) {
          reject(error);
        },
  });
  })
  }

  export function updateVehicle(vehicle_id, vehicle, staff_id) {
    console.log("Updating Vehicle:", vehicle, staff_id, vehicle_id);
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `http://localhost:5055/greenShadow/api/v1/vehicle/${vehicle_id}?staffId=${staff_id}`,
        method: "PATCH",
        // contentType: "application/json",
        headers: {
            "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("authToken"),
        },
        data: JSON.stringify(vehicle),
        success: function (result) {
          resolve(result);
        },
        error: function (xhr, status, error) {
          reject(error);
        },
  });
 });
}

export function deleteVehicle(vehicle_id){
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `http://localhost:5055/greenShadow/api/v1/vehicle/${vehicle_id}`,
        type: "DELETE",
        headers: {
          Authorization: "Bearer " + getCookie("authToken"),
        },
        success: (response) => {
          console.log("Vehicle member deleted successfully:", response);
          resolve(response);
        },
        error: (jqXHR, textStatus, errorThrown) => {
          console.error(`Failed to delete vehicle member: ${textStatus}, ${errorThrown}`);
          reject(`Request failed with status: ${jqXHR.status}`);
        },
      });
    })
  }