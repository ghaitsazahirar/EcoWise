// firebase-admin-config.js

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Sesuaikan dengan nama file service account kamu

const firebaseConfig = {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ecowise-47f54-default-rtdb.asia-southeast1.firebasedatabase.app" // Ganti dengan URL database Firebase Anda
};

admin.initializeApp(firebaseConfig);

const db = admin.firestore(); // Firebase Firestore database

module.exports = { admin, db };
