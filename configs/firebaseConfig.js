// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "carmarketplace-83576.firebaseapp.com",
  projectId: "carmarketplace-83576",
  storageBucket: "carmarketplace-83576.firebasestorage.app",
  messagingSenderId: "535321175244",
  appId: "1:535321175244:web:6533fa2b4823ffbdac8e69",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
