import "../styles/style.css";
import "../scripts/components/Header";
import "../scripts/components/Footer";
import { toggleMenu, closeMenu, navigateToChallenge, viewProfile,navigateToDetail } from "../scripts/function-nav";
// tantangan-script.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function() {
    const uniqueShape = document.querySelector(".unique-shape");
    const uniqueShapeText = document.querySelector(".unique-shape-text");
    const uniqueShapeImage = document.querySelector(".unique-shape-image");

    gsap.from(uniqueShapeText, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        scrollTrigger: {
            trigger: uniqueShape,
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
            trigger: uniqueShape,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none"
        }
    });

    const challengeCategory = document.querySelector(".challenge-category");

    gsap.from(challengeCategory, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        scrollTrigger: {
            trigger: challengeCategory,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none"
        }
    });

    const challengeButtons = document.querySelectorAll(".challenge-category-button button");

    challengeButtons.forEach(button => {
        gsap.from(button, {
            opacity: 0,
            x: -50,
            duration: 1,
            scrollTrigger: {
                trigger: button,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none none"
            }
        });
    });

    const challengeContainer = document.getElementById("challenge-container");

    gsap.from(challengeContainer, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        scrollTrigger: {
            trigger: challengeContainer,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none"
        }
    });

    // Animasi untuk list challenge
    gsap.utils.toArray(".recommendation-challenge").forEach(elem => {
        gsap.from(elem, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: elem,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none none"
            }
        });

        const text = elem.querySelector(".recommendation-challenge-text");
        gsap.from(text, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            scrollTrigger: {
                trigger: elem,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none none"
            }
        });

        const image = elem.querySelector(".recommendation-challenge-images");
        gsap.from(image, {
            opacity: 0,
            x: -30,
            duration: 0.8,
            scrollTrigger: {
                trigger: elem,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none none"
            }
        });
    });
});

let challenges = {};

// Load challenges from JSON file
fetch('/data/challenges.json')
  .then(response => response.json())
  .then(data => {
    challenges = data;
    initialize(); // Panggil fungsi initialize setelah mendapatkan data
  })
  .catch(error => console.error('Error loading challenges:', error));

  function initialize() {
    const challengeType = getQueryParameter('type') || 'all'; // Default to 'all' if no query parameter
    const defaultButton = document.querySelector(`.${challengeType}-button`);
    console.log("Initializing with challenge type:", challengeType);
    showChallenges(challengeType, defaultButton);
    
    // Jika tidak ada parameter tipe, maka aktifkan tombol all-challenge-button
    if (!getQueryParameter('type')) {
        const allButton = document.querySelector('.all-challenge-button');
        if (allButton) {
            allButton.classList.add('active');
        }
    }
}


function showChallenges(type, button) {
  const container = document.getElementById('challenge-container');
  if (!container) {
    console.error('Element with ID "challenge-container" not found.');
    return;
  }
  container.innerHTML = ''; // Clear previous challenges

  if (type === 'all') {
    showAllChallenges();
  } else {
    challenges[type].forEach(challenge => {
      const challengeDiv = document.createElement('div');
      challengeDiv.classList.add('challenge-recommendation-container', 'active');
      challengeDiv.innerHTML = `
        <div class="recommendation-challenge" onclick="navigateToDetail('${challenge.name}')">
          <div class="recommendation-challenge-text">
            <h3 class="kind-of-challenge-${type}">${challenge.kind}</h3>
            <h2>${challenge.name}</h2>
            <p>${challenge.description}</p>
          </div>
          <div class="recommendation-challenge-images">
            <img src="${challenge.image}" alt="">
          </div>
        </div>
      `;
      container.appendChild(challengeDiv);
    });
  }

  // Remove active class from all buttons and add to the clicked button
  const buttons = document.querySelectorAll('.challenge-category-button button');
  buttons.forEach(btn => btn.classList.remove('active'));
  if (button) {
    button.classList.add('active');
  }
}

function showAllChallenges() {
  const container = document.getElementById('challenge-container');
  if (!container) {
    console.error('Element with ID "challenge-container" not found.');
    return;
  }
  container.innerHTML = ''; // Clear previous challenges

  Object.keys(challenges).forEach(type => {
    challenges[type].forEach(challenge => {
      const challengeDiv = document.createElement('div');
      challengeDiv.classList.add('challenge-recommendation-container', 'active');
      challengeDiv.innerHTML = `
        <div class="recommendation-challenge" onclick="navigateToDetail('${challenge.name}')">
          <div class="recommendation-challenge-text">
            <h3 class="kind-of-challenge-${type}">${challenge.kind}</h3>
            <h2>${challenge.name}</h2>
            <p>${challenge.description}</p>
          </div>
          <div class="recommendation-challenge-images">
            <img src="${challenge.image}" alt="">
          </div>
        </div>
      `;
      container.appendChild(challengeDiv);
    });
  });
}


function getQueryParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    initialize();
});


// Set functions to the global window object
window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;
window.navigateToChallenge = navigateToChallenge;
window.viewProfile = viewProfile;
window.showChallenges = showChallenges;
window.navigateToDetail = navigateToDetail;
