class EcoHeader extends HTMLElement {
    connectedCallback() {
        // Ensure Firebase is initialized and available
        if (!firebase.apps.length) {
            console.error("Firebase not initialized!");
            return;
        }

        // Handle authentication state changes
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // Display user profile information
                this.renderLoggedInHeader(user);
            } else {
                // Render header for logged-out state
                this.renderLoggedOutHeader();
            }
        });
    }

    renderLoggedInHeader(user) {
        this.innerHTML = `
            <header class="header-homepage">
                <div class="header-content">
                    <button class="hamburger-menu" onclick="toggleMenu()">
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </button>
                    <a href="homepage.html">
                        <div class="logo-header">
                            <img src="../public/assets/svg/logo-ecowise.svg" alt="Website Logo">
                        </div>
                    </a>
                    <div class="profile-container">
                        <button class="profile-button" id="profileButton">
                            <i class="fas fa-user"></i>
                        </button>
                        <div class="user-profile" id="userProfile" style="display: none;">
                            <span class="user-name">${user.displayName}</span>
                            <span class="user-email">${user.email}</span>
                            <button id="signOutButton">Sign Out</button>
                        </div>
                    </div>
                </div>
                <nav class="nav-menu">
                    <div class="logo-navbar">
                        <img src="../public/assets/img/eco_logo-2.png" alt="Website Logo">
                        <i class="fa-solid fa-xmark" onclick="closeMenu()"></i>
                    </div>
                    <div class="logo-navbar">
                        <i class="fa-solid fa-house"></i>
                        <a href="homepage.html">Beranda</a>
                    </div>
                    <div class="logo-navbar">
                        <i class="fa-solid fa-book"></i>
                        <a href="edukasi.html">Edukasi</a>
                    </div>
                    <div class="logo-navbar">
                        <i class="fa-solid fa-seedling"></i>
                        <a href="kategoritantangan.html">Tantangan</a>
                    </div>
                    <div class="logo-navbar">
                        <i class="fa-solid fa-gift"></i>
                        <a href="reward.html">Reward</a>
                    </div>
                    <div class="logo-navbar">
                        <i class="fa-solid fa-comments"></i>
                        <a href="faq.html">FAQ</a>
                    </div>
                </nav>
            </header>
        `;

        // const userPointsElement = this.querySelector('#userPoints');
        // this.displayUserPoints(userPointsElement, user.uid);

        const profileButton = this.querySelector("#profileButton");
        const userProfile = this.querySelector("#userProfile");
        profileButton.addEventListener("click", () => {
            userProfile.style.display = userProfile.style.display === "none" ? "block" : "none";
        });

        const signOutButton = this.querySelector("#signOutButton");
        signOutButton.addEventListener("click", async () => {
            try {
                await firebase.auth().signOut();
                window.location.href = "index.html"; // Redirect after sign out
            } catch (error) {
                console.error("Error signing out:", error);
                alert("Failed to sign out. Please try again later.");
            }
        });
    }

    renderLoggedOutHeader() {
        this.innerHTML = `
            <header class="header-homepage">
                <div class="header-content">
                    <button class="hamburger-menu" onclick="toggleMenu()">
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </button>
                    <a href="homepage.html">
                        <div class="logo-header">
                            <img src="../public/assets/svg/logo-ecowise.svg" alt="Website Logo">
                        </div>
                    </a>
                    <div class="profile-container">
                        <button class="profile-button" id="profileButton">
                            <i class="fas fa-user"></i>
                        </button>
                    </div>
                </div>
                <nav class="nav-menu">
                    <div class="logo-navbar">
                        <img src="../public/assets/img/eco_logo-2.png" alt="Website Logo">
                        <i class="fa-solid fa-xmark" onclick="closeMenu()"></i>
                    </div>
                    <div class="logo-navbar">
                        <i class="fa-solid fa-house"></i>
                        <a href="homepage.html">Beranda</a>
                    </div>
                    <div class="logo-navbar">
                        <i class="fa-solid fa-book"></i>
                        <a href="edukasi.html">Edukasi</a>
                    </div>
                    <div class="logo-navbar">
                        <i class="fa-solid fa-seedling"></i>
                        <a href="kategoritantangan.html">Tantangan</a>
                    </div>
                    <div class="logo-navbar">
                        <i class="fa-solid fa-gift"></i>
                        <a href="reward.html">Reward</a>
                    </div>
                    <div class="logo-navbar">
                        <i class="fa-solid fa-comments"></i>
                        <a href="faq.html">FAQ</a>
                    </div>
                </nav>
            </header>
        `;

        const profileButton = this.querySelector("#profileButton");
        profileButton.addEventListener("click", () => {
            alert("Anda harus login terlebih dahulu!");
            // Redirect to login page or handle as needed
        });
    }

    // Fungsi untuk menampilkan poin pengguna
    // displayUserPoints(element, userId) {
    //     // Misalnya, dapatkan poin pengguna dari Firestore atau sumber data lainnya
    //     // Disini saya mengambil data dummy untuk menunjukkan contoh

    //     const userPoints = 100; // Contoh data poin pengguna

    //     element.textContent = `${userPoints} Points`; // Tampilkan poin pengguna di dalam elemen
    // }
}

customElements.define('eco-header', EcoHeader);
