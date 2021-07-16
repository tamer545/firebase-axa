import './App.css';
import firebase from 'firebase'
import '@firebase/firestore';
import React from "react";
import {useState, useEffect} from "react";


//InitializeFirebase
const firebaseConfig = {
    apiKey: "AIzaSyCz7LHkBTKEuHjöL4Ayt-hhUtzkyKkZpqV4",
    authDomain: "my-awesome-project-2021-timo.firebaseapp.com",
    databaseURL: "https://my-awesome-project-2021-timo-default-rtdb.firebaseio.com",
    projectId: "my-awesome-project-2021-timo",
    storageBucket: "my-awesome-project-2021-timo.appspot.com",
    messagingSenderId: "35329406836",
    appId: "1:35329406836:web:91561c8a64a7e609c31e21",
    measurementId: "G-8QJ37QTYZ7"
};
firebase.initializeApp(firebaseConfig)
let db = firebase.firestore();//Writeacollectionwithadocmario
db.collection("characters")
    .doc("mario")
    .set({employment: "plumber", outfitColor: "red", specialAttack: "fireball"})
    .then()


export default function FireStoreDatabase() {

    // create new user
    firebase.auth()
        .createUserWithEmailAndPassword("kaik@kaik.ch", "123456")
        .then(() => console.log("user created in"))
        .catch(error => console.error("could not create user: ", error))

// sign in
    firebase.auth()
        .signInWithEmailAndPassword("kaik@kaik.ch", "123456")
        .then(() => {
            console.log("user logged in")
        })
        .catch(error => console.error("could not sign in user: ", error))

    // LifeCycle
    useEffect(() => {
        // firestore read collection users
        // 1. Möglichkeit
        db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data().highscore}`);
            });
        });
    }, [])

    function storeHighScore(userId, score) {
        // firebase realtime db
        firebase.database().ref('users/' + userId).set({
            highscore: score
        });
        // firebase firestore
        // Add a new document "id" in collection "users"
        db.collection("users").doc("id: " + userId).set({id: userId, highscore: score}).then(function () {
            console.log("firestore Id: " + userId + " New High Score: " + score);
        }).catch(function (error) {
            console.error("Error writing document: ", error);
        });
    }

    function buttonPressed() {
        storeHighScore(Math.floor(Math.random() * 10), Math.floor(Math.random() * 100))
    }


    return (
        <div>
            <br/>
            <br/>
            <button onClick={buttonPressed}>test</button>
        </div>
    )
}


