export function login(email, password) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "http://localhost:5055/crop-monitor/api/v1/auth/signup",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ email, password }),
        success: function (result) {
          console.log(result);
          resolve(result); // resolving with the response result
        },
        error: function (xhr, status, error) {
          reject(error); // rejecting on error
        },
    });
    });
  }

  