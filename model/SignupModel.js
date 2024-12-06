export function register(email, password, role) {
  const raw = {
    email: email,
    password: password,
    role: role,
  };

  console.log(raw);

  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:5055/greenShadow/v1/auth/signup",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(raw),
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