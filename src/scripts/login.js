import "../styles/style.css"
import { goBack } from "../scripts/function-nav";
import { toggleMenu, closeMenu } from "../scripts/function-nav";
// login-script.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Daftarkan plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function() {
    // Animasi untuk login container
    gsap.from(".login-container", {
        duration: 1.5,
        opacity: 0,
        y: 50,
        ease: "power1.out"
    });

    // Animasi untuk elemen-elemen dalam login container
    gsap.from(".login-container > *", {
        duration: 1.5,
        opacity: 0,
        y: 50,
        ease: "power1.out",
        stagger: 0.2,
        delay: 0.5
    });
});

// Attach click event to the back button
document.getElementById("backButton").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default link behavior
    goBack(); // Call the goBack function
});

window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;