export function saveStaffMember(staffData) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "http://localhost:5055/greenShadow/api/v1/staff",
        type: "POST",
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
  
  export function getAll() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "http://localhost:5055/greenShadow/api/v1/staff",
        type: "GET",
        dataType: "json", // Automatically parses JSON response
        success: (response) => {
          console.log(response); // Logs the staff members
          resolve(response); // Resolves the promise with the response
        }
      });
    });
  }

  export function updateStaffMember(staffData) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `http://localhost:5055/greenShadow/api/v1/staff/${staffData.id}`,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(staffData),
        success: (response) => {
          console.log("Staff member updated successfully:", response);
          resolve(response);
        },
        error: (jqXHR, textStatus, errorThrown) => {
          console.error(`Failed to update staff member: ${textStatus}, ${errorThrown}`);
          reject(`Request failed with status: ${jqXHR.status}`);
        },
      });
    });
  }
  

