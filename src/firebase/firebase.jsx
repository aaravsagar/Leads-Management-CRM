import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "your fiirebase apikey",
  authDomain: "yout firebase authdomain",
  projectId: "your firebase projectid",
  storageBucket: "your firebase storage bucket id",
  messagingSenderId: "your firebase messaging sender id",
  appId: "your firebase appid"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
