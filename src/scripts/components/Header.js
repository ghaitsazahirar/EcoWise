class EcoHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header class="header-homepage">
        <div class="header-content">
            <button class="hamburger-menu" onclick="toggleMenu()">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </button>
            <div class="logo-header">
                <img src="assets/svg/logo-ecowise.svg" alt="Website Logo">
            </div>
            <button class="profile-button" onclick="viewProfile()">
                <i class="fas fa-user"></i>
            </button>
        </div>
        <nav class="nav-menu">
            <div class="logo-navbar">
                <img src="assets/img/eco_logo-2.png" alt="Website Logo">
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
                <a href="#">FAQ</a>
            </div>
        </nav>
    </header>`;
    }
}

customElements.define('eco-header', EcoHeader);
