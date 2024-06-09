// src/scripts/functions.js
export function showChallenges(type, button) {
    const container = document.getElementById('challenge-container');
    container.innerHTML = ''; // Clear previous challenges

    if (type === 'all') {
        showAllChallenges();
    } else {
        challenges[type].forEach(challenge => {
            const challengeDiv = document.createElement('div');
            challengeDiv.classList.add('challenge-recommendation-container', 'active');
            challengeDiv.innerHTML = `
                <div class="recommendation-challenge">
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

export function showAllChallenges() {
    const container = document.getElementById('challenge-container');
    container.innerHTML = ''; // Clear previous challenges

    Object.keys(challenges).forEach(type => {
        challenges[type].forEach(challenge => {
            const challengeDiv = document.createElement('div');
            challengeDiv.classList.add('challenge-recommendation-container', 'active');
            challengeDiv.innerHTML = `
                <div class="recommendation-challenge">
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
