import "../styles/style.css"; // Mengimpor CSS global
import "../scripts/components/Header";
import "../scripts/components/Footer";
import { toggleMenu, closeMenu } from "../scripts/function-nav";

document.addEventListener("DOMContentLoaded", function() {
    const questionContainers = document.querySelectorAll(".question-title-container");
    questionContainers.forEach(container => {
        container.addEventListener("click", function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector("i");

            this.classList.toggle('active');
            
            if (answer.style.display === "block") {
                answer.style.display = "none";
                icon.classList.remove("fa-angle-up");
                icon.classList.add("fa-angle-down");
            } else {
                answer.style.display = "block";
                icon.classList.remove("fa-angle-down");
                icon.classList.add("fa-angle-up");
            }
        });
    });
});



window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;