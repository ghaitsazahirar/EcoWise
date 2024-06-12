import "../styles/style.css"; // Mengimpor CSS global
import "../scripts/components/Header";
import "../scripts/components/Footer";
import { toggleMenu, closeMenu } from "../scripts/function-nav";
// faq-script.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function() {
    const faqElement = document.querySelector(".faq-element");
    const questionContainer = document.querySelector(".question-container");

    gsap.from(faqElement, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        scrollTrigger: {
            trigger: faqElement,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none"
        }
    });

    gsap.from(questionContainer, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        scrollTrigger: {
            trigger: questionContainer,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none"
        }
    });

    // Animasi untuk setiap pertanyaan
    gsap.utils.toArray(".question-list").forEach((elem, index) => {
        gsap.from(elem, {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: index * 0.3, // Penundaan antara setiap elemen
            scrollTrigger: {
                trigger: elem,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none none"
            }
        });
    });
});


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