// Import the functions you need from the SDKs you need

// src/firebase.js

import { getFirestore } from 'firebase/firestore';

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyAFdtrR9htWozSv6_EiiWjkq6BmhGxqX7M",

  authDomain: "scheduler-16ab1.firebaseapp.com",

  projectId: "scheduler-16ab1",

  storageBucket: "scheduler-16ab1.appspot.com",

  databaseURL: "https://test-14e9c-default-rtdb.europe-west1.firebasedatabase.app/",

  messagingSenderId: "1034873712430",

  appId: "1:1034873712430:web:84c5019591bef20f01d4bf",

  measurementId: "G-QVLRF911P6"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

//const analytics = getAnalytics(app);
/*
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();
const batch = firestore.batch();
*/
const firestore = getFirestore(app);

//export { firestore };
export { app, firestore };