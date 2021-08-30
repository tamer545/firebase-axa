import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from "firebase";
import Main from "./project/Main";
import {HashRouter} from 'react-router-dom';

//InitializeFirebase
const firebaseConfig = {
    apiKey: "AIzaSyAKPxlXlJRVD7DwGaZ5htNGWSmlPRoR2Ls",
    authDomain: "todoliste-5382e.firebaseapp.com",
    databaseURL: "https://todoliste-5382e-default-rtdb.firebaseio.com",
    projectId: "todoliste-5382e",
    storageBucket: "todoliste-5382e.appspot.com",
    messagingSenderId: "971203866724",
    appId: "1:971203866724:web:f8d72416786622d473ef71",
    measurementId: "G-VGLJMJM2H0"
};
firebase.initializeApp(firebaseConfig)

ReactDOM.render(
  <React.StrictMode>
      <HashRouter basename="/#"><Main /></HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);