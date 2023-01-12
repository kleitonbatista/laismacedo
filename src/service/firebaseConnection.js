// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
require('firebase/auth')

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmbNOLnlMZXJBPjXq7q8k-sNA7og9EirI",
  authDomain: "laismacedo-84691.firebaseapp.com",
  projectId: "laismacedo-84691",
  storageBucket: "laismacedo-84691.appspot.com",
  messagingSenderId: "766659902941",
  appId: "1:766659902941:web:50f50cf6508516d72d8a34",
  measurementId: "G-W69TJJJG5N",
};

firebase.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
