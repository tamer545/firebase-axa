import './App.css';
import firebase from 'firebase';
import React, {useState} from "react";
import {useEffect} from "react/cjs/react.production.min";


//InitializeFirebase
const firebaseConfig = {
    apiKey: "AIzaSyCz7LHkBTKEuHjL4Ayt-hhUtzkyKkZpqV4",
    authDomain: "my-awesome-project-2021-timo.firebaseapp.com",
    databaseURL: "https://my-awesome-project-2021-timo-default-rtdb.firebaseio.com",
    projectId: "my-awesome-project-2021-timo",
    storageBucket: "my-awesome-project-2021-timo.appspot.com",
    messagingSenderId: "35329406836",
    appId: "1:35329406836:web:91561c8a64a7e609c31e21",
    measurementId: "G-8QJ37QTYZ7"
};
firebase.initializeApp(firebaseConfig)


export default function App() {
    const [user, setUser] = useState('')
    const [highscore, setHighScore] = useState('')

    // create new user
    firebase.auth()
        .createUserWithEmailAndPassword("test@test.ch", "123456")
        .then(() => console.log("user created in"))
        .catch(error => console.error("could not create user: ", error))

// sign in
    firebase.auth()
        .signInWithEmailAndPassword("test@test.ch", "123456")
        .then((data) => {
            setUser(data.user)
            console.log(data.user.uid)
        })
        .catch(error => console.error("could not sign in user: ", error))


    return (
        <div>
            <br/>
            <br/>
            <button onClick={buttonPressed}>test</button>
        </div>
    );


    function buttonPressed() {
        storeHighScore(user, Math.floor(Math.random() * 100))
    }

    function storeHighScore(user, score) {
        if (user != null) {
            firebase.database().ref('users/' + user.uid).set({highscore: score});
        }
    }

    function setupHighscoreListener(userId) {
        firebase.database().ref('users/' + userId).on('value', (snapshot) => {
            setHighScore(snapshot.val().highscore);
            setUser(userId);
            console.log("Newhighscore:" + highscore);
        });
    }

    function Loading(props) {
        useEffect(() => {
            firebase.auth().onAuthStateChanged(user => {
                props.navigation.navigate(user ? 'Main' : 'SignUp')
            })
        }, [])
    }
}
