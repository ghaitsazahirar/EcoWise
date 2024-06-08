// src/index.js
import "../styles/style.css";
import "../scripts/components/Header";
import "../scripts/components/Footer";
import { toggleMenu, closeMenu, navigateToChallenge, viewProfile, navigateToDetail } from "../scripts/function-nav";

document.addEventListener('DOMContentLoaded', () => {
    // Fetch data tantangan dari file JSON
    fetch('/data/challenges.json')
        .then(response => response.json())
        .then(data => {
            // Ambil tantangan acak dari masing-masing jenis
            const dailyChallenge = getRandomChallenge(data.daily);
            const baseChallenge = getRandomChallenge(data.base);
            const weeklyChallenge = getRandomChallenge(data.weekly);

            // Tampilkan rekomendasi tantangan
            if (dailyChallenge) displayChallenge(dailyChallenge, 'daily');
            if (baseChallenge) displayChallenge(baseChallenge, 'base');
            if (weeklyChallenge) displayChallenge(weeklyChallenge, 'weekly');
        })
        .catch(error => console.error('Error loading challenges:', error));
});

// Fungsi untuk mendapatkan tantangan acak dari array tantangan
function getRandomChallenge(challenges) {
    if (!challenges || challenges.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * challenges.length);
    return challenges[randomIndex];
}

function displayChallenge(challenge, type) {
    const recommendationContainer = document.getElementById('challenge-recommendations');

    if (!recommendationContainer) {
        console.error('Element with ID "challenge-recommendations" not found.');
        return;
    }

    const challengeDiv = document.createElement('div');
    challengeDiv.classList.add('challenge-recommendation-container-homepage');

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

    // Tambahkan elemen tantangan ke dalam kontainer rekomendasi
    recommendationContainer.appendChild(challengeDiv);
}


// Dummy user data (Replace this with your actual user data)
const userData = {
    name: "John Doe",
    points: 1000
};

// Function to update user profile
function updateUserProfile() {
    const usernameElement = document.getElementById("username");
    const pointsElement = document.getElementById("userPoints");

    // Update profile with user data
    usernameElement.textContent = userData.name;
    pointsElement.textContent = userData.points;
}


// Call the function to initially load user profile
updateUserProfile();

// Set functions to the global window object
window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;
window.navigateToChallenge = navigateToChallenge;
window.viewProfile = viewProfile;
window.navigateToDetail = navigateToDetail;
