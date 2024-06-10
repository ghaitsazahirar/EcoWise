import "../styles/style.css";
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
updateUserProfile();

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const rewardType = urlParams.get('reward');
    const confirmationMessageElement = document.getElementById('confirmationMessage');
    
    if (rewardType === 'shopee') {
        confirmationMessageElement.innerHTML = '<div class="reward-message">500 Poin = 50.000 Voucher Shopee</div>';
    } else if (rewardType === 'tokopedia') {
        confirmationMessageElement.innerHTML = '<div class="reward-message"><p> 500 Poin = 50.000 Tokopeida Gift Card</p></div>';
    } else {
        confirmationMessageElement.innerHTML = '<div class="reward-message">Reward tidak diketahui!</div>';
    }
});

function confirmReward() {
    alert('Reward Anda telah dikonfirmasi!');
    // Tambahkan logika tambahan di sini, misalnya mengarahkan ke halaman lain atau mengirim data ke server
}

