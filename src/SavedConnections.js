import {Button, Container, Form, Image, ListGroup, ListGroupItem, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import './App.css';
import bus from "./images/bus.png"
import zug from "./images/zug.png"
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDZuoSpRMIpjO8bqkNPPw6thNh5wxJ3IrU",
    authDomain: "savedsbbconnections.firebaseapp.com",
    databaseURL: "https://savedsbbconnections-default-rtdb.firebaseio.com",
    projectId: "savedsbbconnections",
    storageBucket: "savedsbbconnections.appspot.com",
    messagingSenderId: "797913603611",
    appId: "1:797913603611:web:f64ecdbdd18ada0a5de2be",
    measurementId: "G-N8HV89YWSJ"
};
firebase.initializeApp(firebaseConfig)

export default function SavedConnections() {

    const [user, setUser] = useState('')
    const [toStation, setToStation] = useState('')
    const [fromStation, setFromStation] = useState('')
    const [connections, setConnections] = useState([])

    // create new user
    firebase.auth()
        .createUserWithEmailAndPassword("main@timo.ch", "adminn")
        .then(() => console.log("user created in"))
        .catch(error => console.error("could not create user: ", error))

    useEffect(() => {

// sign in
        firebase.auth()
            .signInWithEmailAndPassword("main@timo.ch", "adminn")
            .then((data) => {
                setUser(data.user)
                console.log(data.user.uid)
            })
            .catch(error => console.error("could not sign in user: ", error))
    }, []);


    function searchConnection() {
        fetch('http://transport.opendata.ch/v1/connections?from=' + fromStation + '&to=' + toStation)
            .then(response => response.json())
            .then(data => {
                setConnections([...connections, data.connections])
                storeConnections(user, data.connections)
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    function storeConnections(user, allConnections) {
        if (user != null) {
            console.log(allConnections)
            firebase.database().ref('users/' + user.uid)
                .set({Connections: allConnections})
                .catch(e => console.error(e));
        }
    }

    return (
        <Form>
            <h1>Zugverbindung suchen</h1>
            <br/>
            <h3>Abfahrtsort: </h3>
            <input size={45} type="text" value={fromStation} onChange={e => setFromStation(e.target.value)}/>
            <br/>
            <h3>Zielort: </h3>
            <input size={45} type="text" value={toStation} onChange={e => setToStation(e.target.value)}/>
            <br/>
            <br/>
            <Button onClick={searchConnection}>suche</Button>
            <br/>
            <br/>

            <Container>
                <ListGroup>
                    {connections.map((con, index) =>
                        <ListGroupItem key={index}>
                            <h4>{con.from.station.name} --> {con.to.station.name}</h4>
                            <br/>
                            {con.sections[0].journey.category === "B" ? <img width={50} src={bus}/> :
                                <img width={50} src={zug}/>}
                            {con.to.platform != null && <> <h5>Abfahrtsgleis:</h5>{con.to.platform} </>}
                            <h5>Abfahrtszeit:</h5> {formatTime(new Date(con.from.departure))}
                            <h5>Ankunftszeit:</h5> {formatTime(new Date(con.to.arrival))}
                        </ListGroupItem>
                    )}
                </ListGroup>
            </Container>
        </Form>

    );
}

function formatTime(date) {
    if (date.getMinutes() <= 10) {
        return date.getHours() + ":0" + date.getMinutes();
    } else {
        return date.getHours() + ":" + date.getMinutes();
    }
}


