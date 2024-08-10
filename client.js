// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCE543tH5G2jBrMtJtND9-9lTeoe2IBiNo",
  authDomain: "valustore-49c53.firebaseapp.com",
  databaseURL: "https://valustore-49c53-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "valustore-49c53",
  storageBucket: "valustore-49c53.appspot.com",
  messagingSenderId: "735198782745",
  appId: "1:735198782745:web:6ecf9fc5b5d75935e79188"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

document.getElementById('signup-form').addEventListener("submit", function (event) {
  event.preventDefault();

  const first_name = document.getElementById('first_name').value;
  const last_name = document.getElementById('last_name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      set(ref(database, 'users/' + user.uid), {
        first_name: first_name,
        last_name: last_name,
        email: email
      }).then(() => {
        alert("Account created successfully!");
        window.location.href = "SignIn.html";
      }).catch((error) => {
        alert("Error writing to database: " + error.message);
      });
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert("Error: " + errorMessage);
    });
});

document.getElementById('signin-form').addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          const user = userCredential.user;

          const dt = new Date();
          update(ref(database, 'users/' + user.uid), {
              last_login: dt.toString(),
          }).then(() => {
              alert('User logged in');
              window.location.href = "recente.html";
          }).catch((error) => {
              console.error("Error updating last login: ", error);
              alert("Error updating last login");
          });
      })
      .catch((error) => {
          const errorMessage = error.message;
          console.error("Error signing in: ", errorMessage);
          alert("Error: " + errorMessage);
      });
});

