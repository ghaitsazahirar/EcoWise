// Dummy user data (Replace this with your actual user data)
const userData = {
    name: "John Doe",
    points: 1000
};

// Function to update user profile
function updateUserProfile() {
    const usernameElement = document.getElementById("username");
    const pointsElement = document.getElementById("userPoints");

    // Update profile with user data
    usernameElement.textContent = userData.name;
    pointsElement.textContent = userData.points;
}

// Call the function to initially load user profile
updateUserProfile();

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

function viewProfile() {
    // Fungsi untuk melihat profil
}



