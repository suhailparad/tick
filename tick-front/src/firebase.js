// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJvwkWRE6eh4v2hTuiFWcsoA-QXpHy5QQ",
  authDomain: "tick-managr.firebaseapp.com",
  projectId: "tick-managr",
  storageBucket: "tick-managr.firebasestorage.app",
  messagingSenderId: "855013068649",
  appId: "1:855013068649:web:196bcb5ab098dc822e77f8",
  measurementId: "G-9HR6V5Z4T0"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };