document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".register-container");

    firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
            window.location.href = "homepage.html"; // Redirect jika sudah login
        } else {
            renderRegisterForm(); // Render form registrasi jika belum login
        }
    });

    const renderRegisterForm = () => {
        const element = document.createElement("div");
        element.classList.add("Landing");
        element.innerHTML = `
            <a href="index.html" class="icon-back">
                <i class="fa-solid fa-arrow-left"></i>
            </a>
            <h1>Daftar</h1>
            <p>Daftarkan dirimu untuk pengalaman menarik lainnya!</p>
            <img src="../public/assets/img/register-img.png" alt="login">
            <div class="form-group">
                <label for="name">Nama</label>
                <div class="form-group-login">
                    <input type="text" id="name" name="name" placeholder="Masukkan Nama" required>
                    <i class="fa-solid fa-user"></i>
                </div>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <div class="form-group-login">
                    <input type="email" id="email" name="email" placeholder="Masukkan Email" required>
                    <i class="fa-solid fa-envelope"></i>
                </div>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <div class="form-group-login">
                    <input type="password" id="password" name="password" placeholder="Masukkan Password" required>
                    <i class="fa-solid fa-unlock"></i>
                </div>
            </div>
            <div class="form-group">
                <label for="konfirm-password">Konfirmasi Password</label>
                <div class="form-group-login">
                    <input type="password" id="konfirm-password" name="konfirm-password" placeholder="Masukkan Password Konfirmasi" required>
                    <i class="fa-solid fa-unlock"></i>
                </div>
            </div>
            <div class="btn-register">
                <button id="registerButton">Register</button>
                <button id="googleLoginButton">Google Login</button>
            </div>
        `;

        container.innerHTML = ""; // Kosongkan kontainer sebelum menambahkan elemen baru
        container.appendChild(element); // Tambahkan elemen form registrasi ke kontainer

        const nameInput = element.querySelector("#name");
        const emailInput = element.querySelector("#email");
        const passwordInput = element.querySelector("#password");
        const confirmPasswordInput = element.querySelector("#konfirm-password");

        const registerBtn = element.querySelector("#registerButton");
        registerBtn.addEventListener("click", async () => {
            // Ambil nilai dari input form
            const nameValue = nameInput.value.trim();
            const emailValue = emailInput.value.trim();
            const passwordValue = passwordInput.value.trim();
            const confirmPasswordValue = confirmPasswordInput.value.trim();

            // Validasi input
            if (!nameValue || !emailValue || !passwordValue || !confirmPasswordValue) {
                alert("Mohon lengkapi semua kolom!");
                return;
            }

            if (passwordValue !== confirmPasswordValue) {
                alert("Konfirmasi password tidak sesuai!");
                return;
            }

            try {
                // Kirim permintaan POST ke server Hapi untuk registrasi
                const response = await fetch('http://localhost:3000/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: nameValue,
                        email: emailValue,
                        password: passwordValue
                    })
                });

                const data = await response.json();
                alert(data.message); // Tampilkan pesan sukses atau error

                // Redirect ke halaman beranda jika registrasi berhasil
                if (response.ok) {
                    window.location.href = "homepage.html";
                }
            } catch (error) {
                console.error("Error during registration:", error);
                alert("Gagal membuat akun. Periksa koneksi internet atau coba lagi nanti.");
            }
        });

        const googleLoginBtn = element.querySelector("#googleLoginButton");
        googleLoginBtn.addEventListener("click", async () => {
            try {
                const provider = new firebase.auth.GoogleAuthProvider();
                await firebase.auth().signInWithRedirect(provider); // Login menggunakan Google
            } catch (error) {
                console.error("Error during Google login:", error);
                alert("Gagal login dengan Google. Coba lagi nanti.");
            }
        });
    };
});
