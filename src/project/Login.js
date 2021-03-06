import {FormControl, InputGroup, Button} from "react-bootstrap";
import React, {useState} from "react";
import ToDoListe from "./ToDoList";
import '../App.css';
import firebase from "firebase";

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [pwFromDatabase, setPwFromDatabase] = useState('')

    function onLogin() {

        if (password == getPassword().password){
            console.log("login successful")
            this.props.history('/#/todolist');
        }
    }

    function getPassword() {
        // on() method
        firebase.database().ref('usernames/' + username + '/security').on('value', (snap) => {
            if (snap.val()) {
                console.log("snap.val()", snap.val())
                return snap.val()

            } else {
                console.log("User existiert nicht")
                return
            }
        });
    }

    return (
        <div>
            <h1>ToDo List</h1><br/>
            <h2>Login</h2>
            <div className={"d-flex"} id={"inputDiv"}>
                <InputGroup className={"form-group w-25"}>
                    <FormControl
                        aria-label="Default"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}>
                    </FormControl>
                </InputGroup>
            </div>
            <br/>
            <div className={"d-flex"} id={"inputDiv"}>
                <InputGroup className={"form-group w-25"}>
                    <FormControl
                        aria-label="Default"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}>
                    </FormControl>
                </InputGroup>
            </div>
            <br/>
            <Button onClick={() => onLogin()}> <a className={"buttonLink"} href="/firebase-axa/#/todolist">Login</a></Button>
            <br/>
            <h6>Don't have an account yet? <a className={"normalLink"} href="/firebase-axa/#/registration">Register</a></h6>
        </div>
    );
}