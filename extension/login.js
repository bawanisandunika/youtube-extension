import { auth, signInWithEmailAndPassword } from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");

  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // If login is successful, navigate to popup.html
      window.location.href = "popup.html";
    } catch (error) {
      // Handle errors
      console.error("Error during login:", error);
      alert("Invalid email or password. Please try again.");
    }
  });
});