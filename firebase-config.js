// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAZEDFgMZA5JkIX0QD7_fjGCphAMd6Omrc",
    authDomain: "fast-chess-424409-a3.firebaseapp.com",
    projectId: "fast-chess-424409-a3",
    storageBucket: "fast-chess-424409-a3.appspot.com",
    messagingSenderId: "618698036528",
    appId: "1:618698036528:web:a40beb906f93d7566e24f5",
    measurementId: "G-V6E3M98Z74"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
