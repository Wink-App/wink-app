// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnn-8rIBYwyypEpulhTaoQJUGMFD9PX1g",
  authDomain: "wink-app-b7146.firebaseapp.com",
  databaseURL: "https://wink-app-b7146-default-rtdb.firebaseio.com",
  projectId: "wink-app-b7146",
  storageBucket: "wink-app-b7146.appspot.com",
  messagingSenderId: "471190546218",
  appId: "1:471190546218:web:0e7e8793318795db32e053",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;
