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

  apiKey: "AIzaSyCCWS-HjSO2-jrdKgRw1FDzNUHvQWpDpH4",

  authDomain: "test-14e9c.firebaseapp.com",

  databaseURL: "https://test-14e9c-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "test-14e9c",

  storageBucket: "test-14e9c.appspot.com",

  messagingSenderId: "847843407060",

  appId: "1:847843407060:web:fb5cfd812be50f73b9b741",

  measurementId: "G-FPM2PJ2E83",


 

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);



export { app, firestore };