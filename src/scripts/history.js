import "../styles/style.css";
import "../scripts/components/Header";
import "../scripts/components/Footer";
import { toggleMenu, closeMenu, navigateToDetail } from "../scripts/function-nav";


function loadChallengesHistory() {
    const container = document.getElementById('history-list');
    if (!container) {
        console.error('Element with ID "challenge-history" not found.');
        return;
    }
    container.innerHTML = ''; // Clear previous challenges

    fetch('/data/challenges-history.json')
        .then(response => response.json())
        .then(challengesData => {
            // Iterate through daily challenges
            challengesData.daily.forEach(challenge => {
                const challengeDiv = createChallengeElement(challenge);
                container.appendChild(challengeDiv);
            });

            // Iterate through weekly challenges
            challengesData.weekly.forEach(challenge => {
                const challengeDiv = createChallengeElement(challenge);
                container.appendChild(challengeDiv);
            });

            // Iterate through base challenges
            challengesData.base.forEach(challenge => {
                const challengeDiv = createChallengeElement(challenge);
                container.appendChild(challengeDiv);
            });
        })
        .catch(error => console.error('Error loading challenges:', error));
}

function createChallengeElement(challenge) {
    const challengeDiv = document.createElement('div');
    challengeDiv.classList.add('challenge-recommendation-container', 'active');

    // Determine the status class based on challenge.status
    let statusClass = '';
    if (challenge.status === 'Diterima') {
        statusClass = 'diterima';
    } else if (challenge.status === 'Menunggu Verifikasi') {
        statusClass = 'menunggu';
    } else if (challenge.status === 'Ditolak') {
        statusClass = 'ditolak';
    }

    challengeDiv.innerHTML = `
        <div class="recommendation-challenge" onclick="navigateToDetail('${challenge.name}')">
            <div class="recommendation-challenge-text">
                <h3 class="kind-of-challenge-${challenge.kind.toLowerCase().replace(' ', '-')}">${challenge.kind}</h3>
                <h2>${challenge.name}</h2>
                <p>${challenge.description}</p>
                <p class="challenge-status challenge-status-${statusClass}">${challenge.status}</p>
            </div>
            <div class="recommendation-challenge-images">
                <img src="${challenge.image}" alt="${challenge.name}">
            </div>
        </div>
    `;
    return challengeDiv;
}


function loadRewardHistory() {
    const container = document.getElementById('history-list');
    if (!container) {
        console.error('Element with ID "reward-history" not found.');
        return;
    }
    container.innerHTML = ''; // Clear previous history

    fetch('/data/reward-history.json')
        .then(response => response.json())
        .then(rewards => {
            rewards.forEach(reward => {
                const rewardDiv = createRewardElement(reward);
                container.appendChild(rewardDiv);
            });
        })
        .catch(error => console.error('Error loading reward history:', error));
}

function createRewardElement(reward) {
    const rewardDiv = document.createElement('div');
    rewardDiv.classList.add('reward-history-list');

    const date = new Date(reward.date);
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

    let platformImage;
    if (reward.platform === 'tokopedia') {
        platformImage = '<img src="assets/img/tokopedia-png.png" alt="tokopedia">';
    } else if (reward.platform === 'shopee') {
        platformImage = '<img src="assets/img/shopee-png.png" alt="shopee">';
    } else {
        platformImage = '';
    }

    // Determine the status class based on reward.status
    let statusClass = '';
    if (reward.status === 'Berhasil') {
        statusClass = 'berhasil';
    } else if (reward.status === 'Proses') {
        statusClass = 'menunggu';
    } 

    rewardDiv.innerHTML = `
        <div class="reward-history-list-text">
            <p class="exchange-date">${formattedDate}</p>
            <p class="exchange-description">Penukaran <i class="fa-solid fa-star"> </i> 100 Poin</p>
            <h3 class="exchange-amount">Rp.${reward.amount},-</h3>
            <p class="exchange-status exchange-status-${statusClass}">${reward.status}</p>
        </div>
        <div class="reward-history-list-images">
            ${platformImage}
        </div>
    `;

    return rewardDiv;
}

function toggleHistory(type) {
    const challengeButton = document.querySelector('.challenge-history-button');
    const rewardButton = document.querySelector('.reward-history-button');

    if (type === 'challenges') {
        if (!challengeButton.classList.contains('active')) {
            loadChallengesHistory();
            challengeButton.classList.add('active');
            rewardButton.classList.remove('active');
        }
    } else if (type === 'rewards') {
        if (!rewardButton.classList.contains('active')) {
            loadRewardHistory();
            rewardButton.classList.add('active');
            challengeButton.classList.remove('active');
        }
    }
}

// Inisialisasi default saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Menetapkan challenge-history-button sebagai default aktif
    const challengeButton = document.querySelector('.challenge-history-button');
    challengeButton.classList.add('active');
});
document.addEventListener('DOMContentLoaded', function() {
    // Menetapkan challenge-history-button sebagai default aktif
    const challengeButton = document.querySelector('.challenge-history-button');
    const rewardButton = document.querySelector('.reward-history-button');

    // Memastikan hanya challengeButton yang aktif saat halaman dimuat
    challengeButton.classList.add('active');
    rewardButton.classList.remove('active');

    // Memuat challenges history sebagai default ketika halaman pertama kali dimuat
    loadChallengesHistory();
});

window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;
window.navigateToDetail = navigateToDetail;
window.loadChallengesHistory = loadChallengesHistory;
window.loadRewardHistory = loadRewardHistory;
window.toggleHistory = toggleHistory;