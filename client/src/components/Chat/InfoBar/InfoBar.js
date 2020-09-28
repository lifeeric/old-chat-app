import React from 'react';
import './InfoBar.css';
import closeIcon from './closeIcon.png';
import onlineIcon from './onlineIcon.png';

export default function InfoBar({history}) {
    console.log(history)
    return (
        <div className='infoBar'>
            <img className="online" src={onlineIcon} alt="online icon" />
            <img className="close" onClick={() => history.push('/')} src={closeIcon} alt="Close Icon" />
        </div>
    )
}
