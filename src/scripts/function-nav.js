// src/scripts/functions.js
export function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const headerContent = document.querySelector('.header-content');
    const mainContent = document.querySelector('main');
    
    navMenu.classList.toggle('active');
    headerContent.classList.toggle('blur');
    mainContent.classList.toggle('blur');
}

export function closeMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const headerContent = document.querySelector('.header-content');
    const mainContent = document.querySelector('main');
    
    navMenu.classList.remove('active');
    headerContent.classList.remove('blur');
    mainContent.classList.remove('blur');
}


export function navigateToChallenge(type) {
    window.location.href = 'kategoritantangan.html?type=' + type;
}

export function viewProfile() {
    // Fungsi untuk melihat profil
}

// navigation.js
export function goBack() {
    window.history.back();
}

export function navigateToDetail(challengeName) {
    window.location.href = `detailtantangan.html?name=${encodeURIComponent(challengeName)}`;
  }
  