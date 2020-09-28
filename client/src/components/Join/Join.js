import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

// Styling
const useStyles = makeStyles(theme => ({
    root: {
        display: 'grid',
        placeItems: 'center',
        height: '100vh',
        textAlign: 'center'
    },
    paper: {
        width: 400,

    },
    input: {
        width: '80%',
        margin: '10px auto'
    },
    button: {
        margin: '15px auto'
    }
}));

export default function Join({history}) {

    // Style
    const classes = useStyles();

    // State 
    const [name, setName] = React.useState({name: '', err: false});
    const [room, setRoom] = React.useState({name: '', err: false});

    // Input User Handler
    const inputUserHandler = (event) => {
        setName({name: event.target.value, err: false});
        console.log(name)
    }

    // Input Room Handler
    const inputRoomHandler = (event) => {
        setRoom({ name: event.target.value, err: false});
    }

    // on Form Submit
    const onSubmit = (event) => {
        event.preventDefault();

        // Sort form of if, if the name is emtpy
        if ( !name.name)
        {
            setName({...name, err: true});
        }

        if ( !room.name )
        {
            // same if the room is empty, so error
            setRoom({...room, err: true});
        }

        
        if( name.name && room.name )
            history.push(`/chat?name=${name.name}&room=${room.name}`);
            
    }


    return (
        <div className={classes.root}>
            <Paper elevation={2} className={classes.paper}>
                <h1>Join The Room</h1>
                <TextField error={name.err} className={classes.input}
                    onKeyPress={(event) =>  event.key === 'Enter' ? onSubmit(event) : null}
                    label="Username"
                     onChange={inputUserHandler}
                     variant="standard" />
                <TextField error={room.err} className={classes.input}
                    onKeyPress={(event) =>  event.key === 'Enter' ? onSubmit(event) : null}
                    label="Room Name"
                     onChange={inputRoomHandler}
                     variant="standard" />
                <Button
                    component={Link} 
                    color="primary"
                    type="submit" 
                    className={classes.button}
                    to={`/chat/name=${name.name}&rom=${room.name}`} 
                    onClick={onSubmit}
                    variant="outlined">Join Now</Button>
            </Paper>
        </div>
    )
}
