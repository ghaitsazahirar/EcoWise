document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Tindakan yang dilakukan saat formulir disubmit
    console.log('Email:', email);
    console.log('Password:', password);

    // Misalnya, Anda bisa mengirim data ini ke server atau menggunakan Firebase Authentication
});