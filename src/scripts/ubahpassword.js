import "../styles/style.css";
import { goBack } from "../scripts/function-nav";
import { toggleMenu, closeMenu } from "../scripts/function-nav";

document.addEventListener("DOMContentLoaded", function() {
    // Attach click event to the back button
    document.getElementById("backButton").addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default link behavior
        goBack(); // Call the goBack function
    });

    function togglePassword(inputId, button) {
        var input = document.getElementById(inputId);

        if (input.type === "password") {
            input.type = "text";
            button.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
        } else {
            input.type = "password";
            button.innerHTML = '<i class="fa-solid fa-eye"></i>';
        }
    }

    // Attach click event to the toggle buttons
    document.querySelectorAll(".toggle-password").forEach(button => {
        button.addEventListener("click", function() {
            togglePassword(this.previousElementSibling.id, this);
        });
    });

    window.togglePassword = togglePassword; // Make the function available globally
    window.toggleMenu = toggleMenu;
    window.closeMenu = closeMenu;
});
