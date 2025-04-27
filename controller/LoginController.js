import { login } from "../model/LoginModel.js";
import { getCookie, saveCookie } from "../model/TokenModel.js";

$("#login-btn").on("click", () => {
    const email = $("#username-inputfield").val();
    const password = $("#password-inputfield").val();
    login(email, password)
      .then((response) => {
        //alert("awaaa");
        localStorage.setItem("userEmail", email);
        const token = response.token;
        saveCookie("authToken", token);
        console.log("Token saved as cookie:", getCookie("authToken") );
        window.location = "/pages/dashboard.html";
      })
      .catch((error) => {
        alert("Invalid Credentials..");
        console.log("Error:", error);
});
})

