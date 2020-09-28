import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReactEmoji from 'react-emoji';

const useStyles = makeStyles(theme => ({
    sendByUser: {
        background: '#e7e7e7',
        padding: theme.spacing(0.02),
        paddingLeft: theme.spacing(1),
        marginBottom: theme.spacing(1),
        borderRadius: '10px',
        width: '90%',
        display: 'inline-block'
    },
    user: {
        color: '#999',
        float: 'right',
        fontSize: '12px',
        marginRight: theme.spacing(1)
    },
    sendByMe: {
        background: '#3498db',
        float: 'right',
        padding: theme.spacing(0.02),
        paddingLeft: theme.spacing(1),
        marginBottom: theme.spacing(1),
        borderRadius: '10px',
        width: '90%',
        display: 'inline-block'
    }
}));

export default function Message({message, user}) {
    
    // CSS
    const classes = useStyles();

    let current_user = false;

    user = user.trim().toLowerCase();

    if( message.user === user )
        current_user = true;

    return (
        current_user ? (
            <div className={classes.sendByMe}>
                <p>{ReactEmoji.emojify(message.text)} <span className={classes.user}>{message.user}</span></p>
            </div>
        ) :
        (
            <div className={classes.sendByUser}>
                <p>{ReactEmoji.emojify(message.text)} <span className={classes.user}>{message.user}</span></p>
            </div>
        )
    );
}
