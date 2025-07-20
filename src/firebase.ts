
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCH84YBMOqyOpwz6z0QgLQf0OpJgZCW_-8",
  authDomain: "app-realtime-8c2e6.firebaseapp.com",
  projectId: "app-realtime-8c2e6",
  storageBucket: "app-realtime-8c2e6.firebasestorage.app",
  messagingSenderId: "1018010303695",
  appId: "1:1018010303695:web:e625530fd8ce3f294b8bba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
