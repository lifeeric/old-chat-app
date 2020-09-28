import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { makeStyles } from '@material-ui/core/styles';
import io from 'socket.io-client';
import { Paper } from '@material-ui/core';
import InfoBar from './InfoBar/InfoBar';
import Input from './Input/Input';
import Messages from '../Messages/Messages';

// styling
const useStyles = makeStyles(theme => ({
    root: {
        display: 'grid',
        placeItems: 'center',
        height: '100vh'
    },
    paper: {
        width: 400,
        height: 400,
        position: 'relative'
    }
}));

let socket;

export default function Chat({location, history}) {


    // classes 
    const classes = useStyles();

    // State
    const [name, setName] = useState();
    const [room, setRoom] = useState();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'http://localhost:5000';


    // Use Effect
    useEffect(() => {
       
        // Parsing url
        const {name, room} = queryString.parse(location.search);
       
        socket = io(ENDPOINT);

        // Set Roo, Name
        setName(name);
        setRoom(room);
        

        // Send the message
        socket.emit('join', {name, room}, error => {
           if(error){
               alert(error);
               history.push('/');
           }
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, location.search]);

    // Method 2
    useEffect(() => {
        socket.on('message', (message) => {
            console.log(message);
            setMessages(messages => [...messages, message]);
            
        });
    }, []);


    // Sending Messages
    const sendMessage = (msg) => {

        socket.emit('sendMessage', msg, () => setMessage(''));
    }


    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <InfoBar history={history} />
                <Messages messages={messages} user={name} />
                <Input setMsgValue={(message) => sendMessage(message)} />
            </Paper>
        </div>
    )
}
