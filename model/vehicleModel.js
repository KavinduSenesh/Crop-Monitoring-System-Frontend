export function getAllVehicles(){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:5055/greenShadow/api/v1/vehicle",
            type: "GET",
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
        contentType: "application/json",
        // headers: {
        //   Authorization: "Bearer " + getCookie("authToken"),
        // },
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
        //   Authorization: "Bearer " + getCookie("authToken"),
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