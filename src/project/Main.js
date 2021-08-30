import '../App.css';
import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import Login from './Login.js'
import Registration from './Registration.js'
import ToDoList from "./ToDoList";


export default function Main() {


    return (
        <div>
            <Switch>
                <Route path="/login" component={Login} basename={process.env.PUBLIC_URL}/>
                <Route path="/registration" component={Registration} basename={process.env.PUBLIC_URL}/>
                <Route path="/todolist" component={ToDoList} basename={process.env.PUBLIC_URL}/>
                <Route path="/" basename={process.env.PUBLIC_URL}>
                    <Redirect to="/login"/>
                </Route>

            </Switch>

        </div>
    );
}
