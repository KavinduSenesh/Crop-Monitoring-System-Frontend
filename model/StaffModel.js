import {getCookie} from "./tokenModel.js";

//save staff member
export function saveStaff(staffData) {
  console.log("Saving staff member:", staffData);
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "http://localhost:5055/greenShadow/api/v1/staff",
        type: "POST",
        headers: {
          Authorization: "Bearer " + getCookie("authToken"),
        },
        contentType: "application/json", // Specify the content type as JSON
        data: JSON.stringify(staffData), // Convert the staff data object to a JSON string
        success: (response) => {
          console.log("Staff member saved successfully:", response);
          resolve(response); // Resolves the promise with the server's response
        },
        error: (jqXHR, textStatus, errorThrown) => {
          console.error(`Failed to save staff member: ${textStatus}, ${errorThrown}`);
          reject(`Request failed with status: ${jqXHR.status}`);
        },
      });
    });
  }
  
export function getAllStaff() {  
  return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:5055/greenShadow/api/v1/staff", // Ensure this matches your backend endpoint
            type: "GET",
            // mode: "no-cors",
            headers: {
              Authorization: "Bearer " + getCookie("authToken"),
            },
            dataType: "json", // Automatically parses JSON response
            success: (response) => {
                console.log("Staff members fetched successfully:", response); // Log response
                resolve(response); // Resolve promise with response
            },
            error: (xhr, status, error) => {
                console.error("Error fetching staff members:", error); // Log error
                reject(error); // Reject promise with error
            }
        });
    });
}

export function getStaff(staffId) {
  $.ajax({
    url: `http://localhost:5055/greenShadow/api/v1/staff/${staffId}`,
    type: "GET",
    headers: {
      Authorization: "Bearer " + getCookie("authToken"),
    },
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
};

export function deleteStaffMember(staffId){
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenShadow/api/v1/staff/${staffId}`,
      type: "DELETE",
      headers: {
        Authorization: "Bearer " + getCookie("authToken"),
        "content-type": "application/json",
      },
      success: (response) => {
        console.log("Staff member deleted successfully:", response);
        resolve(response);
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.error(`Failed to delete staff member: ${textStatus}, ${errorThrown}`);
        reject(`Request failed with status: ${jqXHR.status}`);
      },
    });
  })
}

export function updateStaff(staffId, staff){
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenShadow/api/v1/staff/${staffId}`,
      type: "PATCH",
      contentType: "application/json",
      headers: {
        Authorization: "Bearer " + getCookie("authToken"),
      },
      data: JSON.stringify(staff),
      success: function (result) {
        console.log(result);
        resolve(result);
      },
      error: function (xhr, status, error) {
        reject(error);
      },
  });
  });
}


// export function updateStaffMember(staffId, staffData) {
//   console.log(staffId, staffData);
//   return new Promise((resolve, reject) => {
//       $.ajax({
//           url: `http://localhost:5055/greenShadow/api/v1/staff/${staffId}`, // URL with staffId for the PUT request
//           type: "PATCH", // Use PUT for updating resources
//           contentType: "application/json", // Specify the content type as JSON
//           data: JSON.stringify(staffData), // Convert the staff data object to a JSON string
//           success: (response) => {
//               console.log("Staff member updated successfully:", response);
//               resolve(response); // Resolves the promise with the server's response
//           },
//           error: (jqXHR, textStatus, errorThrown) => {
//               console.error(`Failed to update staff member: ${textStatus}, ${errorThrown}`);
//               reject(`Request failed with status: ${jqXHR.status}`);
//           },
//       });
//   });
// }