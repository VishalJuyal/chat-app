import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoWAsJZ0GqHHiobTCFw-2IljW1NjTV3GE",
  authDomain: "chat-app-24e36.firebaseapp.com",
  projectId: "chat-app-24e36",
  storageBucket: "chat-app-24e36.appspot.com",
  messagingSenderId: "426681525080",
  appId: "1:426681525080:web:51cd7fd5271d0e4b7d3b2d",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
