// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC3q1D1PTa0hItOMGfQ83Z4hgUUPukrxlU",
    authDomain: "osmium-915.firebaseapp.com",
    projectId: "osmium-915",
    storageBucket: "osmium-915.appspot.com",
    messagingSenderId: "288686191481",
    appId: "1:288686191481:web:e359ee84f237e6823935a8",
    measurementId: "G-KSXCF5E3V4"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const storageRef = ref(storage);
