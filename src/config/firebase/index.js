import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB_f1KcXBB5vpB0PLCdxXP4H37YTB_pUFM",
  authDomain: "final-auth-assignment-58f6c.firebaseapp.com",
  databaseURL: "https://final-auth-assignment-58f6c-default-rtdb.firebaseio.com",
  projectId: "final-auth-assignment-58f6c",
  storageBucket: "final-auth-assignment-58f6c.firebasestorage.app",
  messagingSenderId: "1022580678840",
  appId: "1:1022580678840:web:ad68bdb184e401e2ed144d",
  measurementId: "G-MYG4BZDQBX"
};
const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider(); // ✅ Google Provider Export//
const Firebase = getAuth(app); 
 export default Firebase;
