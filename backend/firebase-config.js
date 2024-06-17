// Inisialisasi Firebase SDK
const firebaseConfig = {
    apiKey: "AIzaSyD80GZeXbbQvjZRhOuVN0hybwRplwJfFt0",
    authDomain: "ecowise-47f54.firebaseapp.com",
    databaseURL: "https://ecowise-47f54-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ecowise-47f54",
    storageBucket: "ecowise-47f54.appspot.com",
    messagingSenderId: "510097608746",
    appId: "1:510097608746:web:73c068c148c3b72891b353",
    measurementId: "G-HBGKBDT8Y4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const database = firebase.database();

// Export Firebase services
window.firebaseConfig = firebaseConfig;
window.db = db;
window.database = database;
