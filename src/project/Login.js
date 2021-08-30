import {FormControl, InputGroup, Button} from "react-bootstrap";
import React from "react";
import ToDoListe from "./ToDoList";
import '../App.css';

export default function Login() {

    function onLogin(){

    }

    return (
        <div>
            <h1>ToDo List</h1><br/>
            <h2>Login</h2>
            <div className={"d-flex"} id={"inputDiv"}>
                <InputGroup className={"form-group w-25"}><FormControl aria-label="Default"
                                                                       placeholder="Username"></FormControl></InputGroup>
            </div>
            <br/>
            <div className={"d-flex"} id={"inputDiv"}>
                <InputGroup className={"form-group w-25"}><FormControl aria-label="Default" type="password"
                                                                       placeholder="Password"></FormControl></InputGroup>
            </div>
            <br/>
            <Button onClick={()=> onLogin}> <a href="#/todolist">Login</a></Button>
            <br/>
            <h6>Don't have an account yet? <a href="#/registration">Register</a></h6>
        </div>
    );
}