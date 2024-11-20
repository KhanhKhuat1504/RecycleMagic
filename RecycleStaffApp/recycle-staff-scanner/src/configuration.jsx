import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Your Firebase configuration (already provided)
const firebaseConfig = {
  apiKey: "AIzaSyDHdfHgnNK_95FyUtuvXVPGxnWzW-t5A84",
  authDomain: "recyclemagic-3728d.firebaseapp.com",
  projectId: "recyclemagic-3728d",
  storageBucket: "recyclemagic-3728d.appspot.com",
  messagingSenderId: "362708552412",
  appId: "1:362708552412:web:721ab3c8633e4a0f9fc219",
  measurementId: "G-HN42TSHZSC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

export { db }; // Export the Firestore instance
