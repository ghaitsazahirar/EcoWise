import "../styles/style.css"; // Mengimpor CSS global
import "../scripts/components/Header";
import "../scripts/components/Footer";
import { toggleMenu, closeMenu } from "../scripts/function-nav";

document.addEventListener('DOMContentLoaded', () => {
  const challengeName = getQueryParameter('name');
  if (challengeName) {
    fetch('/data/challenges.json')
      .then(response => response.json())
      .then(data => {
        const challenge = findChallengeByName(data, challengeName);
        if (challenge) {
          displayChallengeDetail(challenge);
        } else {
          console.error('Challenge not found:', challengeName);
        }
      })
      .catch(error => console.error('Error loading challenges:', error));
  } else {
    console.error('No challenge name provided in query parameters.');
  }
});

function displayChallengeDetail(challenge) {
    const kindElement = document.getElementById('challenge-kind');
    
    // Remove all possible classes
    kindElement.className = '';  // Clear existing classes
    kindElement.classList.add('kind-of-challenge');  // Add the base class
  
    // Set text content to match the kind of challenge
    kindElement.textContent = challenge.kind;
  
    // Add class based on the challenge type
    switch(challenge.kind.toLowerCase()) {
      case 'harian':
        kindElement.classList.add('kind-of-challenge-daily');
        break;
      case 'mingguan':
        kindElement.classList.add('kind-of-challenge-weekly');
        break;
      case 'dasar':
        kindElement.classList.add('kind-of-challenge-base');
        break;
      default:
        kindElement.classList.add('kind-of-challenge-default');
    }
  
    // Update the rest of the challenge details
    document.getElementById('challenge-image').src = challenge.image;
    document.getElementById('challenge-title').textContent = challenge.name;
    document.getElementById('challenge-description').textContent = challenge.description;
    
    const stepsList = document.getElementById('challenge-steps-list');
    stepsList.innerHTML = ''; // Clear previous steps
    challenge.steps.forEach(step => {
      const stepItem = document.createElement('li');
      stepItem.textContent = step;
      stepsList.appendChild(stepItem);
    });
  }
  
  

function getQueryParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function findChallengeByName(challenges, name) {
  for (const type in challenges) {
    for (const challenge of challenges[type]) {
      if (challenge.name === name) {
        return challenge;
      }
    }
  }
  return null;
}

window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;