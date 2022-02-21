// src.firebase.js
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQMNWicCK3aMY1ChWrBloSheSK_WRKkdc",
  authDomain: "supermama-6aa87.firebaseapp.com",
  projectId: "supermama-6aa87",
  storageBucket: "supermama-6aa87.appspot.com",
  messagingSenderId: "944499373257",
  appId: "1:944499373257:web:6ac64c485952140f258918"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export {db}