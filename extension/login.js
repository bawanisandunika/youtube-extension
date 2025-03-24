import { 
  auth, 
  db, 
  signInWithEmailAndPassword,
  signInWithPopup,
  googleProvider,
  doc,
  getDoc
} from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const googleSignInBtn = document.getElementById("googleSignInBtn");

  
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        console.log("User data:", userDoc.data());
      }

      
      window.location.href = "popup.html";
    } catch (error) {
      
      console.error("Error during login:", error);
      alert("Invalid email or password. Please try again.");
    }
  });

  // Google Sign-In
  googleSignInBtn.addEventListener("click", async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Optional: Store user data in Firestore
      /*const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date()
        });
      }*/

      // Redirect after successful login
      window.location.href = "popup.html";
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      alert("Google sign-in failed. Please try again.");
    }
  });
});