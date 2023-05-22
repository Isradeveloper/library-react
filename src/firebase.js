import firebase from "firebase/app";
import 'firebase/storage'
import 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWUpuQY0T-Wj2-PY-OFlzju3WJmHnvGmk",
  authDomain: "libraryapp-42aca.firebaseapp.com",
  projectId: "libraryapp-42aca",
  storageBucket: "libraryapp-42aca.appspot.com",
  messagingSenderId: "783218568812",
  appId: "1:783218568812:web:ac85f654e6a69fbb86f249"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const auth = fire.auth

export {fire, auth}