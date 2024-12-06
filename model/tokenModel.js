export function getCookie(name) {
    const cookieString = document.cookie; // Get all cookies as a string
    const cookies = cookieString.split("; "); // Split string into individual cookies
  
    for (let cookie of cookies) {
      const [key, value] = cookie.split("="); // Split each cookie into name and value
      if (key === name) {
        return value; // Return value if the name matches
      }
    }
  
    return null; // Return null if the cookie is not found
  }
  
  export function tokenRefresh() {
    const token = getCookie("authToken");
    console.log("Token: in service", token);
  
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `http://localhost:5055/greenshadow/v1/auth/refresh?refreshToken=${token}`, // Fix: Added quotes around the URL
        type: "POST",
        success: function (result) {
          console.log("Token refresh response:", result);
          resolve(result); // Resolve promise with API response
        },
        error: function (xhr, status, error) {
          console.error(`Error: ${status} - ${error}`); // Fix: Corrected template string syntax
          reject(error); // Reject promise with error
        },
      });
    });
  }
  
  export function saveCookie(name, value) {
    document.cookie = `${name}=${value}; path=/;`; // Fix: Corrected template string syntax
    console.log(`Cookie saved: ${name}=${value}`); // Fix: Corrected template string syntax
  }
  