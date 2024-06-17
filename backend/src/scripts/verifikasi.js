// Referensi ke Firebase Storage
const storage = firebase.storage();
const storageRef = storage.ref();

// Function to retrieve and display files
function displayFiles() {
    const fileContainer = document.getElementById('fileContainer');

    // Mendapatkan daftar semua item (file/folder) dari storage root
    storageRef.listAll().then(function(result) {
        result.prefixes.forEach(function(folderRef) {
            // Membuat elemen untuk menampilkan setiap folder
            const folderElement = document.createElement('div');
            folderElement.classList.add('folder');

            // Judul folder
            const folderTitle = document.createElement('h2');
            folderTitle.textContent = folderRef.name;
            folderElement.appendChild(folderTitle);

            // Container untuk daftar file dalam folder
            const fileList = document.createElement('div');
            fileList.classList.add('file-list');

            // Sekarang Anda dapat mengambil daftar file dari setiap folder
            folderRef.listAll().then(function(folderResult) {
                folderResult.items.forEach(function(itemRef) {
                    // Untuk setiap file, dapatkan URL dan metadata
                    Promise.all([itemRef.getDownloadURL(), itemRef.getMetadata()]).then(function([url, metadata]) {
                        // Menampilkan file dalam halaman HTML
                        const fileItem = document.createElement('div');
                        fileItem.classList.add('file-item');

                        // Menampilkan informasi pengguna (userId), jika ada
                        const userInfo = document.createElement('p');
                        if (metadata.customMetadata && metadata.customMetadata.userId) {
                            userInfo.textContent = `Uploaded by UserID: ${metadata.customMetadata.userId}`;
                        } else {
                            userInfo.textContent = 'Uploaded by Unknown User';
                        }
                        fileItem.appendChild(userInfo);

                        // Menampilkan gambar jika file adalah gambar (opsional)
                        if (itemRef.name.match(/\.(jpeg|jpg|png)$/)) {
                            const imgElement = document.createElement('img');
                            imgElement.src = url;
                            imgElement.alt = itemRef.name;
                            fileItem.appendChild(imgElement);
                        } else {
                            const linkElement = document.createElement('a');
                            linkElement.href = url;
                            linkElement.textContent = itemRef.name;
                            fileItem.appendChild(linkElement);
                        }

                        fileList.appendChild(fileItem);
                    }).catch(function(error) {
                        console.error('Error getting file data:', error);
                    });
                });

                // Masukkan fileList ke dalam folderElement setelah selesai
                folderElement.appendChild(fileList);
            }).catch(function(error) {
                console.error('Error listing files in folder:', error);
            });

            // Masukkan folderElement ke dalam fileContainer
            fileContainer.appendChild(folderElement);
        });
    }).catch(function(error) {
        console.error('Error listing folders:', error);
    });
}

// Function to modify points (add or remove)
function modifyPoints(operation) {
    const pointsInput = document.getElementById('pointsInput');
    const currentPointsElement = document.getElementById('currentPoints');
    
    // Ambil nilai yang dimasukkan pengguna
    const pointsToAdd = parseInt(pointsInput.value, 10);

    // Periksa apakah input valid (angka)
    if (!isNaN(pointsToAdd)) {
        // Ambil nilai points saat ini
        let currentPoints = parseInt(currentPointsElement.textContent, 10);

        // Tambah atau kurangi points sesuai operasi
        if (operation === 'add') {
            currentPoints += pointsToAdd;
        } else if (operation === 'remove') {
            currentPoints -= pointsToAdd;
            if (currentPoints < 0) {
                currentPoints = 0; // Pastikan tidak ada nilai negatif
            }
        }

        // Update nilai points di UI
        currentPointsElement.textContent = currentPoints;

        // Clear input field
        pointsInput.value = '';
    } else {
        alert('Masukkan angka yang valid untuk points.');
    }
}

// Panggil fungsi untuk menampilkan file saat halaman dimuat
window.onload = function() {
    displayFiles();

    // Tambahkan event listener untuk tombol tambah points
    const addPointsBtn = document.getElementById('addPointsBtn');
    addPointsBtn.addEventListener('click', function() {
        modifyPoints('add');
    });

    // Tambahkan event listener untuk tombol hapus points
    const deletePointsBtn = document.getElementById('deletePointsBtn');
    deletePointsBtn.addEventListener('click', function() {
        modifyPoints('remove');
    });
};
