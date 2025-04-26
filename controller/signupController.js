import { register } from "../model/SignupModel.js";

$("#signInButton").click(function() {
    const email = $("#email").val();
    const password = $("#password").val();
    const role = $("#role").val();
    const acceptCookies = $("#acceptCookies").prop("checked");

    register(email, password, role).then((result) => {
      window.location.href = "http://127.0.0.1:5502/index.html";
    }).catch((error) => {
        console.log("Failed to register user");
    });
})