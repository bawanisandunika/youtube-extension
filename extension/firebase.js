import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Your Firebase configuration
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
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, createUserWithEmailAndPassword, signInWithPopup, googleProvider, doc, setDoc };
