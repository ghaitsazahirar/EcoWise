document.getElementById("backButton").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default link behavior
    goBack(); // Call the goBack function
});

window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;