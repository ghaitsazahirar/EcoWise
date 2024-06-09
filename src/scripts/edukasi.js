import "../styles/style.css";
import "../scripts/components/Header";
import "../scripts/components/Footer";
import { toggleMenu, closeMenu, navigateToChallenge, viewProfile } from "../scripts/function-nav";

document.addEventListener('DOMContentLoaded', function() {
    const articles = [
        {
            img: 'assets/img/trash-1.jpg',
            title: 'Jenis-Jenis Sampah dan Cara Pengelolaanya',
            description: 'Kamu akan belajar dan mempraktikkan cara memisahkan sampah',
            content: 'Ini adalah konten artikel tentang jenis-jenis sampah dan cara pengelolaannya.'
        },
        {
            img: 'assets/img/trash-3.jpg',
            title: 'Cara Menjaga Lingkungan dari Sampah',
            description: 'Kamu akan belajar dan menjaga lingkungan dari dampak sampah',
            content: 'Ini adalah konten artikel tentang cara menjaga lingkungan dari sampah.'
        },
        {
            img: 'assets/img/trash-4.jpg',
            title: 'Cara Menjaga Lingkungan dari Sampah',
            description: 'Kamu akan belajar dan menjaga lingkungan dari dampak sampah',
            content: 'Ini adalah konten artikel tentang cara menjaga lingkungan dari sampah.'
        },
        {
            img: 'assets/img/trash-2.jpg',
            title: 'Cara Menjaga Lingkungan dari Sampah',
            description: 'Kamu akan belajar dan menjaga lingkungan dari dampak sampah',
            content: 'Ini adalah konten artikel tentang cara menjaga lingkungan dari sampah.'
        },
        {
            img: 'assets/img/trash-5.jpg',
            title: 'Cara Menjaga Lingkungan dari Sampah',
            description: 'Kamu akan belajar dan menjaga lingkungan dari dampak sampah',
            content: 'Ini adalah konten artikel tentang cara menjaga lingkungan dari sampah.'
        },
        {
            img: 'assets/img/trash-1.jpg',
            title: 'Cara Menjaga Lingkungan dari Sampah',
            description: 'Kamu akan belajar dan menjaga lingkungan dari dampak sampah',
            content: 'Ini adalah konten artikel tentang cara menjaga lingkungan dari sampah.'
        },
        // Tambahkan artikel lainnya di sini
    ];

    if (document.querySelector('.education-container-2')) {
        // Code for main page
        const container = document.querySelector('.education-container-2');

        articles.forEach((article, index) => {
            const articleDiv = document.createElement('div');
            articleDiv.id = 'education-list-container';
            articleDiv.innerHTML = `
                <img src="${article.img}" alt="image-article">
                <h2 class="article-title">${article.title}</h2>
                <p class="article-description">${article.description}</p>
                
            `;
            articleDiv.addEventListener('click', () => {
                localStorage.setItem('selectedArticle', JSON.stringify(article));
                window.location.href = 'detailartikel.html';
            });
            container.appendChild(articleDiv);
        });
    } else if (document.querySelector('.article-container')) {
        // Code for detail page
        const article = JSON.parse(localStorage.getItem('selectedArticle'));

        if (article) {
            document.getElementById('hero-img').src = article.img;
            document.getElementById('hero-title').textContent = article.title;
            document.getElementById('article-content').textContent = article.content;
        } else {
            document.querySelector('.article-container').textContent = 'Artikel tidak ditemukan.';
        }
    }

});

// Set functions to the global window object
window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;
window.navigateToChallenge = navigateToChallenge;
window.viewProfile = viewProfile;