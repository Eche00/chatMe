// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbU2iGzn39wbd-P3JdBnDuxT-emx_tdwA",
  authDomain: "chatme-ae9e7.firebaseapp.com",
  projectId: "chatme-ae9e7",
  storageBucket: "chatme-ae9e7.appspot.com",
  messagingSenderId: "704645971111",
  appId: "1:704645971111:web:522f486b23efc9e5e2af82",
  measurementId: "G-RZ7B0XL3PE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
