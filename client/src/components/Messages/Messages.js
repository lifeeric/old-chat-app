import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Scroll from 'react-scroll-to-bottom';
import Message from './Message/Message';

const useStyles = makeStyles(theme => ({
    root: {
        height: '280px',
        overflow: 'hidden',
        margin: theme.spacing(1)
    }
}));

export default function Messages({messages, user}) {

    const classes = useStyles();

    return (
        <Scroll className={classes.root}>
            {messages.map((msg, i) => <Message key={i} message={msg} user={user}/>)}
        </Scroll>
    )
}
