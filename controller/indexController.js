import { login } from "../model/indexModel.js";
import { getCookie, saveCookie } from "../model/tokenModel.js";

$("#signInButton").click(function () {
  const email = $("#email").val();
  const password = $("#password").val();
  const acceptCookies = $("#acceptCookies").prop("checked");

  if (!acceptCookies) {
    alert("Please accept cookies to proceed");
    return;
  }

  login(email, password)
    .then((result) => {
      console.log("Login result:", result);
      localStorage.setItem("userEmail", email);
        const token = result.token;
        saveCookie("authToken", token);
        console.log("Token saved as cookie:", getCookie("authToken") );
      
      window.location = "/pages/dashboard.html";
    }).catch((error) => {
      console.log("Login error:", error);
    });
});


































// Redirect to dashboard (replace with your dashboard URL)
  // window.location.href = "http://127.0.0.1:5502/pages/dashboard.html"