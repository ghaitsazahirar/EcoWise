// Get elements
const fileInput = document.getElementById('upload');
const imagePreview = document.getElementById('imagePreview');
const completeButton = document.getElementById('complete');

// Mendapatkan informasi pengguna saat ini
const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                resolve(user.uid); // Mengembalikan userID
            } else {
                reject(new Error('User is not authenticated'));
            }
        });
    });
};

// Handle file input change
fileInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
            alert('File type not supported. Please upload a JPG, JPEG, or PNG image.');
            fileInput.value = ''; // Reset the input
            return;
        }
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            completeButton.style.display = 'inline-block';
        };
        reader.readAsDataURL(file);
    }
    console.log(file);
});

// Handle complete button click
completeButton.addEventListener('click', async function() {
    const file = fileInput.files[0];
    const selectedChallenge = JSON.parse(localStorage.getItem('selectedChallenge'));

    try {
        const userID = await getCurrentUser(); // Mendapatkan userID dinamis

        if (file && selectedChallenge && userID) {
            const { name } = selectedChallenge;

            const formData = new FormData();
            formData.append('image', file);
            formData.append('name', name);
            formData.append('userID', userID);

            const response = await fetch('http://localhost:3000/api/upload', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            if (response.ok) {
                const addPointsResponse = await fetch('http://localhost:3000/api/add-points', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: result.userId,
                        pointsToAdd: 50
                    })
                });

                const addPointsResult = await addPointsResponse.json();
                if (addPointsResponse.ok) {
                    alert('Tantangan selesai! Gambar telah diunggah.');
                    console.log('File available at', result.url);
                    window.location.href = "waitverif-client.html";
                } else {
                    console.error('Error adding points:', addPointsResult.error);
                    alert('Gagal menambahkan poin. Coba lagi nanti.');
                }
            } else {
                console.error('Error uploading file:', result.error);
                alert('Gagal mengunggah gambar. Coba lagi nanti.');
            }
        } else {
            console.error('File or selected challenge is missing');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan. Coba lagi nanti.');
    }
});

// Expose menu functions to global scope
window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;
