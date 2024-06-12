import "../styles/style.css"
import "../scripts/components/Footer";
// script.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Daftarkan plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function() {
    // Animasi untuk elemen dengan ScrollTrigger
    gsap.from(".header", {
        duration: 1.5,
        y: -50,
        opacity: 0,
        ease: "power1.out",
        scrollTrigger: {
            trigger: ".header",
            start: "top top+=100",
            toggleActions: "play none none none"
        }
    });

    gsap.from(".container-1 h1, .container-1 p, .container-1-img", {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: "power1.out",
        stagger: 0.3,
        scrollTrigger: {
            trigger: ".container-1",
            start: "top bottom-=100",
            toggleActions: "play none none none"
        }
    });

    gsap.from(".container-2 h1, .container-2 p, .fitur", {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: "power1.out",
        stagger: 0.3,
        scrollTrigger: {
            trigger: ".container-2",
            start: "top bottom-=100",
            toggleActions: "play none none none"
        }
    });

    gsap.from(".container-3 h1, .comments-section", {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: "power1.out",
        stagger: 0.3,
        scrollTrigger: {
            trigger: ".container-3",
            start: "top bottom-=100",
            toggleActions: "play none none none"
        }
    });

    gsap.from(".container-4 h1, .container-4 p, .gabung", {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: "power1.out",
        stagger: 0.3,
        scrollTrigger: {
            trigger: ".container-4",
            start: "top bottom-=100",
            toggleActions: "play none none none"
        }
    });
});

const comments = [
    {
        name: "Zee JKT 48",
        profilePic: "assets/img/profil-1.jpg",
        comment: "This is a great website!"
    },
    {
        name: "Unkown",
        profilePic: "assets/img/profil-1.jpg",
        comment: "I found this website very useful."
    },
    {
        name: "Bapakmu",
        profilePic: "assets/img/profil-1.jpg",
        comment: "Amazing experience, highly recommend!"
    }
];

let currentIndex = 0;

function displayComment(index) {
    const commentContainer = document.getElementById('comment-container');
    const comment = comments[index];

    commentContainer.innerHTML = `
        <img src="${comment.profilePic}" alt="${comment.name}">
        <h3>${comment.name}</h3>
        <p>"${comment.comment}"</p>
    `;
}

document.getElementById('next-button').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % comments.length;
    displayComment(currentIndex);
});

document.getElementById('prev-button').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + comments.length) % comments.length;
    displayComment(currentIndex);
});

// Display the first comment initially
displayComment(currentIndex);


