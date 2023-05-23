import firebase from 'firebase/compat/app';
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjY2L45E3EqKIglKgB2HQ6X37Kx6dMSdc",
  authDomain: "react-auth-demo-6b154.firebaseapp.com",
  projectId: "react-auth-demo-6b154",
  storageBucket: "react-auth-demo-6b154.appspot.com",
  messagingSenderId: "435428741425",
  appId: "1:435428741425:web:d0f96972eb6f1f2d3fe010",
  measurementId: "G-PGK0M2RL42"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
