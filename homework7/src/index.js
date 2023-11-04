// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCqy1QYIfLUyZo99aTHhVwBaDPh_h7HzHI",
  authDomain: "n315-jereblac.firebaseapp.com",
  projectId: "n315-jereblac",
  storageBucket: "n315-jereblac.appspot.com",
  messagingSenderId: "342992925118",
  appId: "1:342992925118:web:f130c1d64d7b08759909ef",
  measurementId: "G-6XB9R97J4G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function initListeners() {
    $("#createAccBtn").on("click", (e) => {
        e.preventDefault();
        let fName = $("#fname").val();
        let email = $("#Cemail").val();
        let pw = $("#Cpw").val();
        console.log(fName);
createUserWithEmailAndPassword(auth, email, pw)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Error: " + errorMessage);
    // ..
  });
});
    $("#signInBtn").on("click", (e) => {
        let email = $("#email").val();
        let pw = $("#pw").val();
        console.log("sign in");
        signInWithEmailAndPassword(auth, email, pw)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Error Message " + errorMessage);
    // ..
  });
    });
    $("#signOut").on("click", (e) => {
        signOut(auth)
        .then(() => {
            console.log("Signed out!");
        })
    })
}
 
$(document).ready(function () {
initListeners();
});