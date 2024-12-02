// Dropdown Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(dropdown => {
      const dropdownBtn = dropdown.querySelector('.dropdown-btn');
      const dropdownContent = dropdown.querySelector('.dropdown-content');
      const dropdownLinks = dropdownContent.querySelectorAll('li a');

      // Toggle dropdown when button is clicked
      dropdownBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          dropdown.classList.toggle('open');
      });

      // Select dropdown item
      dropdownLinks.forEach(link => {
          link.addEventListener('click', (e) => {
              e.preventDefault();
              const selectedText = link.textContent;
              dropdownBtn.querySelector('span:first-child').textContent = selectedText;
              dropdown.classList.remove('open');
          });
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
          if (!dropdown.contains(e.target)) {
              dropdown.classList.remove('open');
          }
      });
  });
});

    // Event listener for the Sign In button
    document.getElementById("signInButton").addEventListener("click", () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
      
        if (email && password) {
          // Example: You can validate or process login credentials here
          console.log(`Email: ${email}, Password: ${password}`);
          // Redirect to the dashboard or staff management page
          window.location.href = "http://127.0.0.1:5502/pages/dashboard.html"; // Update with your actual target URL
        } else {
          alert("Please enter both email and password!");
        }
      });
      
      document.getElementById("registerLink").addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "staffManagement.html";
  })