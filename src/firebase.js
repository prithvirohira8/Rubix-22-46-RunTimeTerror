import firebase from "firebase/app";
import "firebase/auth" 
import "firebase/database"
const firebaseConfig = {
    apiKey: "AIzaSyBWmxHRWsvQONiSv6lzvefFDPhkIP3gCh4",
    authDomain: "proctor-it-abd2f.firebaseapp.com",
    databaseURL: "https://proctor-it-abd2f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "proctor-it-abd2f",
    storageBucket: "proctor-it-abd2f.appspot.com",
    messagingSenderId: "889623845274",
    appId: "1:889623845274:web:c6fb42fdc51bc680f10223"
  };

  // Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

//Gives Authentication instance 
export const auth = app.auth();

//Gives firebase's reference in general 
export default app;