import { auth, database } from './firebase-config.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";

document.getElementById('signup-button').addEventListener('click', function(event) {
    event.preventDefault();
    const name = document.getElementById('nama').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            set(ref(database, 'users/' + user.uid), {
                nama: name,
                email: email,
                password: password
            })
            .then(() => {
                alert("User telah sukses dibuat");
            })
            .catch((error) => {
                alert(error.message);
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
});
