// Description: It handles the index page logic.
document.addEventListener("DOMContentLoaded", () => {
    const signInButton = document.getElementById("signInButton");
    const registerLink = document.getElementById("registerLink");

    signInButton.addEventListener("click", () => {
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const acceptCookies = document.getElementById("acceptCookies").checked;

        // Basic validation
        if (!email) {
            alert("Please enter your email.");
            return;
        }

        if (!password) {
            alert("Please enter your password.");
            return;
        }

        if (!acceptCookies) {
            alert("You must agree to the terms and conditions.");
            return;
        }
        // Redirect to dashboard (replace with your dashboard URL)
        window.location.href = "http://127.0.0.1:5502/pages/dashboard.html";
    });

    registerLink.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the default link behavior
        // Redirect to registration page (replace with your register page URL)
        window.location.href = "http://127.0.0.1:5502/pages/signup.html";
    });
});
