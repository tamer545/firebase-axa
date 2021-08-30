import '../App.css';
import React from "react";
import {Switch, Route, Link} from "react-router-dom";
import Login from './Login.js'
import Registration from './Registration.js'
import ToDoList from "./ToDoList";


export default function Main() {


    return (
        <div>
            <Switch>
                <Route exact path="/login" component={Login}/>
                <Route path="/registration" component={Registration}/>
                <Route path="/todolist" component={ToDoList}/>
            </Switch>

        </div>
    );
}
