// Firebase/Firebase.js or Firebase/Firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Import GoogleAuthProvider
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABYj3ohUqXZYx7wzF76iTYC2QaRQUEIFs",
  authDomain: "space-beb9b.firebaseapp.com",
  projectId: "space-beb9b",
  storageBucket: "space-beb9b.appspot.com",
  messagingSenderId: "493976127458",
  appId: "1:493976127458:web:8398266b45c8dd0cd51bbb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();

export default app;
