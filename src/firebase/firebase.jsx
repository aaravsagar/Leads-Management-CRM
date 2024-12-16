import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXgB3tfG73qDXWKv_DP9YFf6pzv-ou1zM",
  authDomain: "companyzer0.firebaseapp.com",
  projectId: "companyzer0",
  storageBucket: "companyzer0.firebasestorage.app",
  messagingSenderId: "419515182719",
  appId: "1:419515182719:web:0137dc797e49993e8d994a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
