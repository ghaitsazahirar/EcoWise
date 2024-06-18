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
                <img src="assets/img/ecowise-logo.png" alt="Website Logo">
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
                <a href="homepage.html">Beranda</a>
                <i class="fa-solid fa-house"></i>
            </div>
            <div class="logo-navbar">
                <a href="edukasi.html">Edukasi</a>
                <i class="fa-solid fa-book"></i>
            </div>
            <div class="logo-navbar">
                <a href="kategoritantangan.html">Tantangan</a>
                <i class="fa-solid fa-seedling"></i>
            </div>
            <div class="logo-navbar">
                <a href="reward.html">Reward</a>
                <i class="fa-solid fa-gift"></i>
            </div>
            <div class="logo-navbar">
                <a href="history.html">Riwayat</a>
                <i class="fa-solid fa-clock-rotate-left"></i>
            </div>
            <div class="logo-navbar">
                <a href="faqpage.html">FAQ</a>
                <i class="fa-solid fa-comments"></i>
            </div>
        </nav>
    </header>`;
    }
}

customElements.define('eco-header', EcoHeader);
