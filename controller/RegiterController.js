import { save } from "../model/RegisterModel.js";

$("#register-btn").on("click", () => {
    let username = $("#username-inputfield").val();
    let password = $("#password-inputfield").val();
    let role = $("#role").val();
    console.log("Role : ", role);

    const newUser = {
        email : username,
        password : password,
        role : role
    }

    save(newUser).then(() => {
        alert("User Saved Successfully!");
    });
})