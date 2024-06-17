// Daftarkan plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function() {
    // Animasi untuk elemen dengan ScrollTrigger
    gsap.from(".header", {
        duration: 1.5,
        y: -50,
        opacity: 0,
        ease: "power1.out",
        scrollTrigger: {
            trigger: ".header",
            start: "top top+=100",
            toggleActions: "play none none none"
        }
    });

    gsap.from(".container-1 h1, .container-1 p, .container-1-img", {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: "power1.out",
        stagger: 0.3,
        scrollTrigger: {
            trigger: ".container-1",
            start: "top bottom-=100",
            toggleActions: "play none none none"
        }
    });

    gsap.from(".container-2 h1, .container-2 p, .fitur", {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: "power1.out",
        stagger: 0.3,
        scrollTrigger: {
            trigger: ".container-2",
            start: "top bottom-=100",
            toggleActions: "play none none none"
        }
    });

    gsap.from(".container-3 h1, .comments-section", {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: "power1.out",
        stagger: 0.3,
        scrollTrigger: {
            trigger: ".container-3",
            start: "top bottom-=100",
            toggleActions: "play none none none"
        }
    });

    gsap.from(".container-4 h1, .container-4 p, .gabung", {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: "power1.out",
        stagger: 0.3,
        scrollTrigger: {
            trigger: ".container-4",
            start: "top bottom-=100",
            toggleActions: "play none none none"
        }
    });
});

// Memastikan skrip berjalan setelah DOM selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Panggil fungsi Landing untuk menampilkan konten utama
    Landing();
});

// Fungsi untuk menampilkan komentar-komentar
function displayComment(index) {
    const commentContainer = document.getElementById('comment-container');
    const comments = [
        {
            name: "Zee JKT 48",
            profilePic: "../public/assets/img/profil-1.jpg",
            comment: "This is a great website!"
        },
        {
            name: "Unknown",
            profilePic: "../public/assets/img/profil-1.jpg",
            comment: "I found this website very useful."
        },
        {
            name: "Bapakmu",
            profilePic: "../public/assets/img/profil-1.jpg",
            comment: "Amazing experience, highly recommend!"
        }
    ];

    if (commentContainer) {
        commentContainer.innerHTML = `
            <img src="${comments[index].profilePic}" alt="${comments[index].name}">
            <h3>${comments[index].name}</h3>
            <p>"${comments[index].comment}"</p>
        `;
    }
}

// Fungsi utama untuk menampilkan konten utama halaman
function Landing() {
    const container = document.querySelector(".container-3");
    let currentIndex = 0; // Definisikan currentIndex di dalam fungsi Landing()

    if (container) {
        const element = document.createElement('div');
        element.classList.add('Landing');
        element.innerHTML = (`
            <h1>Bagaimana Menurut Mereka?</h1>
            <div class="comments-section">
                <div class="comment-container" id="comment-container">
                    <!-- Comment content will be inserted here -->
                </div>
                <div class="buttons">
                    <i id="prev-button" class="fas fa-chevron-left"></i>
                    <i id="next-button" class="fas fa-chevron-right"></i>
                </div>
            </div>
        `);

        container.innerHTML = "";
        container.appendChild(element);

        // Menampilkan komentar pertama saat halaman dimuat
        displayComment(currentIndex);

        // Tambahkan event listener untuk tombol next dan prev
        const nextButton = element.querySelector('#next-button');
        const prevButton = element.querySelector('#prev-button');

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % comments.length;
            displayComment(currentIndex);
        });

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + comments.length) % comments.length;
            displayComment(currentIndex);
        });
    }
}

// Deteksi perubahan status login pengguna
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // Jika pengguna sudah login, arahkan ke halaman lain atau tindakan sesuai
        window.location.href = "login.html"; // Misalnya, halaman login
    } else {
        // Jika pengguna belum login, tampilkan halaman utama (Landing page)
        Landing();
    }
});
