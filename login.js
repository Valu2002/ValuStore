import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCE543tH5G2jBrMtJtND9-9lTeoe2IBiNo",
  authDomain: "valustore-49c53.firebaseapp.com",
  databaseURL: "https://valustore-49c53-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "valustore-49c53",
  storageBucket: "valustore-49c53.appspot.com",
  messagingSenderId: "735198782745",
  appId: "1:735198782745:web:6ecf9fc5b5d75935e79188"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);


document.addEventListener('DOMContentLoaded', () => {
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
});

const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

logout.addEventListener('click', (e) => {
  signOut(auth).then(() => {
    // Sign-out successful.
    alert('User logged out')
  }).catch((error) => {
    // An error happened.
    const errorMessage = error.message;
    console.error("Error signing in: ", errorMessage);
    alert("Error: " + errorMessage);
  });
})
