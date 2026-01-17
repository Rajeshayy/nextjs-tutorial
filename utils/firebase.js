
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAJQcx_YfXkTZtDs86j-Zyiu-hiux6KxZI",
    authDomain: "myntra-clone-8d985.firebaseapp.com",
    projectId: "myntra-clone-8d985",
    storageBucket: "myntra-clone-8d985.firebasestorage.app",
    messagingSenderId: "842869589528",
    appId: "1:842869589528:web:7f7ce80b757c7452ef656d",
    measurementId: "G-E20GY619HW"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
