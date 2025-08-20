// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmwg6Wh-sbp_QKsMu1dtbLCoZus_hwXJQ",
  authDomain: "placements-7138f.firebaseapp.com",
  projectId: "placements-7138f",
  storageBucket: "placements-7138f.firebasestorage.app",
  messagingSenderId: "732862219043",
  appId: "1:732862219043:web:d7e6979e98e9293e8d8296",
  measurementId: "G-RM0N9PD9RD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, analytics };
export default app;
