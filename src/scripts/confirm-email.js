import "../styles/style.css"
import { goBack } from "../scripts/function-nav";
import { toggleMenu, closeMenu } from "../scripts/function-nav";

// Attach click event to the back button
document.getElementById("backButton").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default link behavior
    goBack(); // Call the goBack function
});

window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;