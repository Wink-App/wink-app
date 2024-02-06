// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAyunKP9t4dBsHSzks8TxRG_2RUAP-g3pE",
  authDomain: "wink-app-dev.firebaseapp.com",
  // databaseURL: "https://wink-app-dev-default-rtdb.firebaseio.com",
  projectId: "wink-app-dev",
  storageBucket: "wink-app-dev.appspot.com",
  messagingSenderId: "1079002699250",
  appId: "1:1079002699250:web:6f76fe1db22abddf62076b",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;
