import "../styles/style.css";
import "../scripts/components/Header";
import "../scripts/components/Footer";
import { toggleMenu, closeMenu } from "../scripts/function-nav";
document.addEventListener('DOMContentLoaded', function() {
    var rewardLists = document.querySelectorAll('.reward-list');
    
    rewardLists.forEach(function(rewardList) {
        rewardList.addEventListener('click', function() {
            var rewardType = this.getAttribute('data-reward-type');
            window.location.href = 'confirmation.html?reward=' + rewardType;
        });
    });
});

window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;