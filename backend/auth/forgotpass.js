const container = document.querySelector(".forget-password-container");

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // Redirect ke dashboard jika pengguna sudah masuk
        Dashboard();
    } else {
        // Menampilkan halaman lupa password jika pengguna belum masuk
        Landing();
    }
});

// Fungsi untuk menampilkan halaman lupa password
const Landing = () => {
    const element = document.createElement("div");
    element.classList.add('Landing');
    element.innerHTML = `
        <a href="login.html" class="icon-back-1" id="backButton">
            <i class="fa-solid fa-arrow-left"></i>
        </a>
        <h1>Lupa Password</h1>
        <p>Masukkan Email yang telah kamu daftarkan!</p>
        <img src="../public/assets/svg/forgot-password-svg.svg" alt="login">
        <form>
            <div class="form-group">
                <label for="email">Email</label>
                <div class="form-group-login">
                    <input type="email" id="email" name="email" placeholder="Masukkan Email" required>
                    <i class="fa-solid fa-envelope"></i>
                </div>
            </div>
            <div class="btn-login">
                <button id="submit-email" data-button="forgot-pass">Kirim</button>
            </div>
        </form>
    `;
    container.innerHTML = "";
    container.appendChild(element);

    const forgotBtn = element.querySelector(`[data-button="forgot-pass"]`);
    forgotBtn.onclick = async () => {
        const email = document.getElementById("email").value;

        try {
            // Kirim email reset password
            await firebase.auth().sendPasswordResetEmail(email);
            alert("Email untuk reset password telah dikirim. Silakan cek kotak masuk Anda.");
        } catch (error) {
            console.error("Error during password reset:", error);
            alert("Terjadi kesalahan saat melakukan reset password. Pastikan email yang Anda masukkan benar.");
        }
    };
};

// Fungsi untuk menampilkan halaman dashboard (opsional)
const Dashboard = () => {
    const element = document.createElement("div");
    element.classList.add("dashboard");
    element.innerHTML = `
        <h1>Selamat datang di Dashboard!</h1>
        <p>Ini adalah halaman dashboard pengguna yang berhasil login.</p>
        <button id="logoutButton">Logout</button>
    `;
    container.innerHTML = "";
    container.appendChild(element);

    const logoutButton = element.querySelector("#logoutButton");
    logoutButton.addEventListener("click", () => {
        firebase.auth().signOut()
        .then(() => {
            alert("Anda berhasil logout.");
        })
        .catch((error) => {
            alert("Terjadi kesalahan saat logout: " + error.message);
        });
    });
};
