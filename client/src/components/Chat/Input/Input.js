import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';


// styling
const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        left: 20,
        bottom: 0,
        width: 360,
        textAlign: 'center'
    },
    input: {
        width: 260,
        marginTop: theme.spacing(1)
    },
    button: {
        margin: theme.spacing(1),
        float: 'right'
    }
}));

export default function Input({setMsgValue}) {

    // classes
    const classes = useStyles();

    const [message, setMessage] = React.useState('');


    // onSubmit 
    const onSendMessage = (e) => {
        e.preventDefault();

        setMsgValue(message);
        setMessage('');
    }

    return (
        <>
            <Divider />
                <div className={classes.root} >
                    <TextField 
                        className={classes.input} 
                        type="text"
                        value={message}
                        placeholder="Message..."
                        onKeyPress={(e) => e.key === 'Enter' ? onSendMessage(e) : null }
                        onChange={(e) => setMessage(e.target.value)}  />
                    <Button 
                        color="primary"
                        className={classes.button}
                        variant="outlined"
                        type="submit"
                        onClick={onSendMessage}>Send</Button>
                </div>
        </>
    )
}
