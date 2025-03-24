// Firebase Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD08UnuHhYh6LY7dMjWlfoVTJWz08W4veE",
  authDomain: "extension-9ef79.firebaseapp.com",
  projectId: "extension-9ef79",
  storageBucket: "extension-9ef79.appspot.com",
  messagingSenderId: "738171348331",
  appId: "1:738171348331:web:2cd79e109a882b67a8582e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Sign-Up Button
document.getElementById("signupBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === "" || password === "") {
    alert("Please enter email and password.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Sign-up successful! Welcome, " + userCredential.user.email);
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});

// Google Sign-In Button
document.getElementById("googleSignInBtn").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      alert("Signed in with Google: " + result.user.displayName);
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});