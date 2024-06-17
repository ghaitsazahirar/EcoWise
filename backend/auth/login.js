document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector(".login-container");

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            window.location.href = "homepage.html"; // Redirect to homepage if user is already logged in
        } else {
            renderLogin(); // Render login form if user is not logged in
        }
    });

    const renderLogin = () => {
        const element = document.createElement('div');
        element.classList.add('renderLogin');
        element.innerHTML = (`
            <a href="index.html" class="icon-back-1" id="backButton">
                <i class="fa-solid fa-arrow-left"></i>
            </a>
            <h1>Masuk</h1>
            <p>Masukkan Email dan Password yang telah kamu daftarkan!</p>
            <img src="../src/public/assets/svg/signin-svg.svg" alt="login">
            <form action="#" method="POST">
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
                        <i class="fa-solid fa-lock"></i>
                    </div>
                </div>
                <p class="forget-password-i"><a href="forgotpass.html">Lupa password?</a></p>
                <div class="btn-login">
                    <button id="loginButton" type="submit">Login</button>
                </div>
                <div class="separator">atau</div>
                <div class="btn-register">
                    <button class="register-button" onclick="window.location.href='register.html'">Daftar</button>
                </div>
            </form>
        `);

        container.innerHTML = "";
        container.appendChild(element);

        const loginBtn = element.querySelector("#loginButton");
        loginBtn.addEventListener('click', async (e) => {
            e.preventDefault();  // Prevent form submission

            const email = element.querySelector("#email").value;
            const password = element.querySelector("#password").value;

            try {
                const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
                const user = userCredential.user;
                console.log("User signed in successfully:", user);

                const dt = new Date();
                const userRef = firebase.database().ref('user/' + user.uid);

                await userRef.update({
                    last_login: dt.toString(),
                });

                if (user) {
                    try {
                        const idToken = await user.getIdToken();
                        console.log("ID Token:", idToken);
                    } catch (error) {
                        console.error("Error while retrieving ID token:", error);
                    }
                } else {
                    console.log("No user logged in.");
                }

                console.log("Last login updated successfully");
                alert("Successfully logged in");

                window.location.href = "homepage.html"; // Redirect to homepage after successful login

            } catch (error) {
                console.error("Error during sign in or update:", error);
                alert("Failed to login. Please check your email and password.");
            }
        });
    };
});
