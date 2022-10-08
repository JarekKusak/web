import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB1K41oJDbHWN0k0InOHyWynYwExvOWdM8",
  authDomain: "facebook-jarda.firebaseapp.com",
  projectId: "facebook-jarda",
  storageBucket: "facebook-jarda.appspot.com",
  messagingSenderId: "345136027390",
  appId: "1:345136027390:web:a5321feedce0eb22d8b7af"
};
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const storage = firebase.storage();

export {db,storage};