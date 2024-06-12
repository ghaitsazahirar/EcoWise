import "../styles/style.css";
import "../scripts/components/Header";
import "../scripts/components/Footer";
import { toggleMenu, closeMenu } from "../scripts/function-nav";
// reward-script.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function() {
    const uniqueShapeText = document.querySelector(".unique-shape-text");
    const uniqueShapeImage = document.querySelector(".unique-shape-image");
    const rewardText = document.querySelector(".reward-text");
    const rewardListContainer = document.querySelector(".reward-list-container");

    gsap.from(uniqueShapeText, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        scrollTrigger: {
            trigger: uniqueShapeText,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none"
        }
    });

    gsap.from(uniqueShapeImage, {
        opacity: 0,
        x: -50,
        duration: 1.5,
        scrollTrigger: {
            trigger: uniqueShapeImage,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none"
        }
    });

    gsap.from(rewardText, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        scrollTrigger: {
            trigger: rewardText,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none"
        }
    });

    gsap.from(rewardListContainer, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        scrollTrigger: {
            trigger: rewardListContainer,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none"
        }
    });

    // Animasi untuk setiap reward-list
    gsap.utils.toArray(".reward-list").forEach((elem, index) => {
        gsap.from(elem, {
            opacity: 0,
            x: -50,
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

document.addEventListener('DOMContentLoaded', function() {
    var rewardLists = document.querySelectorAll('.reward-list');
    
    rewardLists.forEach(function(rewardList) {
        rewardList.addEventListener('click', function() {
            var rewardType = this.getAttribute('data-reward-type');
            window.location.href = 'confirmation.html?reward=' + rewardType;
        });
    });
});

window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;