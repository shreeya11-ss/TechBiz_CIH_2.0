// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyov-puPxWYtANwMEZt8CpxzlVXG2xAFM",
  authDomain: "crowd-control-2738e.firebaseapp.com",
  databaseURL: "https://crowd-control-2738e-default-rtdb.firebaseio.com",
  projectId: "crowd-control-2738e",
  storageBucket: "crowd-control-2738e.firebasestorage.app",
  messagingSenderId: "262516304980",
  appId: "1:262516304980:web:c5cc6caa79783bed2711c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);