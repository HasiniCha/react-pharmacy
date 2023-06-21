// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIL4Xu6kmNK2YKwpotsmJ74BvQK45e2ic",
  authDomain: "pharmacystorageassistant.firebaseapp.com",
  projectId: "pharmacystorageassistant",
  storageBucket: "pharmacystorageassistant.appspot.com",
  messagingSenderId: "619384116640",
  appId: "1:619384116640:web:99b63a0026ee12de5780c5",
  measurementId: "G-SEEPLXX6MZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);