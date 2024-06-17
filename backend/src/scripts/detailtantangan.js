function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function findChallengeByName(challenges, name) {
    for (const kind in challenges) {
        for (const challenge of challenges[kind]) {
            if (challenge.name === name) {
                return challenge;
            }
        }
    }
    return null;
}

function displayChallengeDetail(challenge) {
    const kindElement = document.getElementById('challenge-kind');
    
    // Remove all possible classes
    kindElement.className = '';  // Clear existing classes
    kindElement.classList.add('kind-of-challenge');  // Add the base class
  
    // Set text content to match the kind of challenge
    kindElement.textContent = challenge.kind;
  
    // Add class based on the challenge kind
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

document.addEventListener('DOMContentLoaded', () => {
    const challengeName = getQueryParameter('name');

    console.log('Challenge Name:', challengeName);

    if (challengeName) {
        const fetchUrl = `http://localhost:3000/api/challenges/${encodeURIComponent(challengeName)}`;
        fetch(fetchUrl)
            .then(response => response.json())
            .then(data => {
                console.log('Data received from server:', data);
                if (data.error) {
                    console.error('Error from server:', data.error);
                } else {
                    const challenge = {
                        kind: data.kind, // Sesuaikan dengan struktur data yang diterima dari server
                        name: data.name,
                        description: data.description,
                        image: data.image,
                        steps: data.steps
                    };
                    if (challenge) {
                        displayChallengeDetail(challenge);

                        // Save selected challenge to localStorage
                        localStorage.setItem('selectedChallenge', JSON.stringify(challenge));
                    } else {
                        console.error('Challenge not found:', challengeName);
                    }
                }
            })
            .catch(error => console.error('Error loading challenges:', error));
    } else {
        console.error('No challenge name provided in query parameters.');
    }
});

// Expose menu functions to global scope
window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;
