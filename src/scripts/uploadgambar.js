import "../styles/style.css"
import "../scripts/components/Header";
import "../scripts/components/Footer";
import { toggleMenu, closeMenu} from "../scripts/function-nav";
document.getElementById('upload').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imagePreview = document.getElementById('imagePreview');
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            document.getElementById('complete').style.display = 'inline-block';
        }
        reader.readAsDataURL(file);
    }
});

document.getElementById('complete').addEventListener('click', function() {
    alert('Tantangan selesai! Gambar telah diunggah.');
});

function showCompleteButton(event) {
    const file = event.target.files[0];
    if (file) {
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.src = URL.createObjectURL(file);
        imagePreview.style.display = 'block';

        const completeButton = document.getElementById('complete');
        completeButton.style.display = 'block';

        completeButton.addEventListener('click', function() {
            window.location.href = 'detailartikel.html'; // Ganti dengan URL halaman tujuan
        });
    }
}


window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;
