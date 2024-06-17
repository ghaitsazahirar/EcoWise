function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const headerContent = document.querySelector('.header-content');
    
    navMenu.classList.toggle('active');
    headerContent.classList.toggle('blur');
}

function closeMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const headerContent = document.querySelector('.header-content');
    
    navMenu.classList.remove('active');
    headerContent.classList.remove('blur');
}

function navigateToChallenge(type) {
    window.location.href = `kategoritantangan.html?type=${type}`;
}

function viewProfile() {
    // Menunggu perubahan status autentikasi pengguna
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // Menampilkan informasi pengguna
            const profileContainer = document.createElement('div');
            profileContainer.classList.add('profile-button');
            
            const profileHtml = `
            <button class="profile-button" onclick="viewProfile()">
                <i class="fas fa-user">
                <div class="user-profile">
                    <span class="user-name">${user.displayName}</span>
                    <span class="user-email">${user.email}</span>
                </div>
                <button id="signOutButton">Sign Out</button>
                </i>
            </button>
            `;

            // Menambahkan event listener untuk tombol logout
            profileContainer.innerHTML = profileHtml;

            const signOutButton = document.getElementById("signOutButton");
            signOutButton.addEventListener("click", async () => {
             try {
            await firebase.auth().signOut();
            window.location.href = "index.html"; // Redirect setelah sign out
            } catch (error) {
            console.error("Error signing out:", error);
            alert("Gagal keluar. Coba lagi nanti.");
        }
    });
        }
    });
}

function navigateToDetail(challengeName) {
    window.location.href = `detailtantangan.html?name=${encodeURIComponent(challengeName)}`;
}

// Make functions available globally
window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;
window.navigateToChallenge = navigateToChallenge;
window.viewProfile = viewProfile;
window.navigateToDetail = navigateToDetail;
