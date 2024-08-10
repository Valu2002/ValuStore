import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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

// Handle user sign-up
document.getElementById('signup-form').addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            set(ref(database, 'users/' + user.uid), {
                first_name: firstName,
                last_name: lastName,
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

// Handle user sign-in
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

// Handle auth state changes
onAuthStateChanged(auth, (user) => {
    const signinBtn = document.getElementById('signin-btn');
    const signupBtn = document.getElementById('signup-btn');
    const welcomeMessage = document.getElementById('welcome-message');
    const userNameSpan = document.getElementById('user-name');
    const logoutBtn = document.getElementById('logout-btn');

    if (user) {
        const dbRef = ref(database, 'users/' + user.uid);
        dbRef.get().then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                userNameSpan.textContent = data.first_name;
            }
        }).catch((error) => {
            console.error("Error fetching user data: ", error);
        });

        signinBtn.style.display = "none";
        signupBtn.style.display = "none";
        welcomeMessage.style.display = "block";
        logoutBtn.style.display = "block";
    } else {
        signinBtn.style.display = "block";
        signupBtn.style.display = "block";
        welcomeMessage.style.display = "none";
        logoutBtn.style.display = "none";
    }
});

// Handle user logout
document.getElementById('logout-btn').addEventListener("click", () => {
    signOut(auth).then(() => {
        alert('User signed out');
        window.location.href = "SignIn.html";
    }).catch((error) => {
        console.error("Error signing out: ", error);
        alert("Error signing out: " + error.message);
    });
});

