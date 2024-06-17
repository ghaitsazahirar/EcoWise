document.addEventListener("DOMContentLoaded", async function () {
    gsap.registerPlugin(ScrollTrigger); // Registrasi plugin GSAP untuk animasi

    // Daftar elemen yang akan dianimasikan
    const elementsToAnimate = [
        ".welcome-user",
        ".lets-change-point",
        ".lets-do-challenge",
        ".challenge-recommendation",
        ".kind-challenge-2"
    ];

    elementsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            gsap.from(element, {
                opacity: 0,
                y: 50,
                duration: 1,
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none none"
                }
            });
        });
    });

    // Inisialisasi halaman utama setelah konten dimuat
    await initializeHomepage();
});

async function initializeHomepage() {
    try {
        // Ambil data tantangan dari challenges.json
        const response = await fetch('../public/data/challenges.json');
        const data = await response.json();

        // Ambil tantangan acak dari kategori harian, dasar, dan mingguan
        const dailyChallenge = getRandomChallenge(data.daily);
        const baseChallenge = getRandomChallenge(data.base);
        const weeklyChallenge = getRandomChallenge(data.weekly);

        // Tampilkan tantangan jika tersedia
        if (dailyChallenge) displayChallenge(dailyChallenge, 'daily');
        if (baseChallenge) displayChallenge(baseChallenge, 'base');
        if (weeklyChallenge) displayChallenge(weeklyChallenge, 'weekly');

    } catch (error) {
        console.error('Error loading challenges:', error);
    }

    // Panggil viewProfile dan displayUserProfile saat status autentikasi berubah
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            viewProfile(user); // Tampilkan profil pengguna
            displayUserProfile(user); // Tampilkan informasi profil pengguna
        } else {
            console.log("No user logged in.");
        }
    });

    // Tambahkan Eco Header di bagian atas body
    const ecoHeader = document.createElement('eco-header');
    document.body.insertBefore(ecoHeader, document.body.firstChild);
}

// Fungsi untuk menampilkan profil pengguna
async function displayUserProfile(user) {
    const welcomeUserElement = document.querySelector('.welcome-user');
    if (user) {
        welcomeUserElement.innerHTML = `
            <div class="container-homepage-img">
                <img src="../public/assets/svg/environment-3.svg" alt="environtment-3">
            </div>
            <div class="welcome-text">
                <p>Selamat Datang</p>
                <h1 id="username">${user.displayName}</h1>
            </div>
            <div class="text-point">
                <p id="points"><i class="fa-solid fa-star"></i><span id="userPoints">Loading...</span> Points</p>
            </div>
            <button class="profile-button" onclick="toggleProfile()">View Profile</button>
        `;

        const userPointsElement = welcomeUserElement.querySelector('#userPoints');
        displayUserPoints(userPointsElement, user.uid); // Tampilkan poin pengguna
    } else {
        console.log('No user logged in.');
    }
}

// Fungsi untuk menampilkan poin pengguna
async function displayUserPoints(element, uid) {
    try {
        // Ambil data pengguna dari Firestore
        const userDoc = await firebase.firestore().collection('users').doc(uid).get();
        
        if (userDoc.exists) {
            const userData = userDoc.data();
            const userPoints = userData.points || 0; // Ambil poin pengguna, default ke 0 jika tidak ada
            
            element.textContent = `${userPoints} Points`; // Tampilkan poin pengguna di dalam elemen
        } else {
            console.log('No user data found for UID:', uid);
        }
    } catch (error) {
        console.error('Error fetching user points:', error);
    }
}

// Fungsi untuk menampilkan tombol profil
function viewProfile(user) {
    if (user) {
        const profileContainer = document.createElement('div');
        profileContainer.classList.add('profile-button');

        const profileHtml = `
            <button class="profile-button" onclick="toggleProfile()">
                <i class="fas fa-user"></i>
                <div class="user-profile">
                    <span class="user-name">${user.displayName}</span>
                    <span class="user-email">${user.email}</span>
                </div>
            </button>
            <button id="signOutButton">Sign Out</button>
        `;

        profileContainer.innerHTML = profileHtml;

        const signOutButton = profileContainer.querySelector("#signOutButton");
        signOutButton.addEventListener("click", async () => {
            try {
                await firebase.auth().signOut();
                window.location.href = "index.html"; // Redirect setelah sign out
            } catch (error) {
                console.error("Error signing out:", error);
                alert("Gagal sign out. Silakan coba lagi nanti.");
            }
        });

        document.querySelector('.welcome-user').appendChild(profileContainer); // Tambahkan profileContainer ke welcomeUserElement
    }
}

// Fungsi untuk toggle profile
function toggleProfile() {
    const userProfile = document.getElementById('userProfile');
    userProfile.style.display = userProfile.style.display === 'none' ? 'block' : 'none';
}

// Fungsi untuk logout
function logout() {
    firebase.auth().signOut().then(() => {
        alert("Berhasil keluar.");
        window.location.href = "index.html";
    }).catch(error => {
        console.error("Error signing out: ", error);
    });
}

// Fungsi untuk navigasi ke halaman tantangan
function navigateToChallenge(type) {
    window.location.href = `kategoritantangan.html?type=${type}`;
}

// Fungsi untuk navigasi ke halaman detail tantangan
function navigateToDetail(challengeName) {
    window.location.href = `detailtantangan.html?name=${encodeURIComponent(challengeName)}`;
}

// Fungsi untuk mendapatkan tantangan acak dari kategori yang diberikan
function getRandomChallenge(challenges) {
    if (!challenges || challenges.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * challenges.length);
    return challenges[randomIndex];
}

// Fungsi untuk menampilkan detail tantangan di halaman utama
function displayChallenge(challenge, type) {
    const recommendationContainer = document.getElementById('challenge-recommendations');
    if (!recommendationContainer) {
        console.error('Element with ID "challenge-recommendations" not found.');
        return;
    }

    const challengeDiv = document.createElement('div');
    challengeDiv.classList.add('recommendation-challenge');

    challengeDiv.innerHTML = `
        <div class="recommendation-challenge-text">
            <h3 class="kind-of-challenge-${type}">${challenge.kind}</h3>
            <h2>${challenge.name}</h2>
            <p>${challenge.description}</p>
        </div>
        <div class="recommendation-challenge-images">
            <img src="${challenge.image}" alt="">
        </div>
    `;

    recommendationContainer.appendChild(challengeDiv);
}

// Ekspos fungsi navigasi ke global scope
window.navigateToChallenge = navigateToChallenge;
window.navigateToDetail = navigateToDetail;
