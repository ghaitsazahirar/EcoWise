const container = document.querySelector(".container");

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        window.location.href = "homepage.html";
    } else {
        Landing();
    }
});

const Landing = () => {
    const element = document.createElement("div");
    element.classList.add("Landing");
    element.innerHTML = (`
        <a href="index.html" class="icon-back">
            <i class="fa-solid fa-arrow-left"></i>
        </a>
        <h1>Daftar</h1>
        <p>Daftarkan dirimu untuk pengalaman menarik lainnya!</p>
        <img src="register-image.png" alt="login">
        <div class="form-group-">
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
        
        <div class="btn-register">
            <button id="register" data-button="regiter">Register</button>
            <button data-button="login">Google</button>
        </div>
    `);

    container.innerHTML = "";
    container.appendChild(element);

    const email = element.querySelector("#email");
    const password = element.querySelector("#password");

    const regiterBtn = element.querySelector(`[data-button="regiter"]`);
    const loginBtn = element.querySelector(`[data-button="login"]`);

    regiterBtn.onclick = () => {
        firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((cred) => {
            window.location.href = "homepage.html";
        })
        .catch((error) => {
            alert(error);
        });
    }

    loginBtn.onclick = () => {
        firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((cred) => {
            alert(`Selamat Datang Akun: ${cred.user.uid}`);
        })
        .catch((error) => {
            alert(error);
        });
    }
}
