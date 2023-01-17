import classes from './SingleMailInbox.module.css'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Markup } from 'interweave';


import React from 'react'
import Header from '../../AuthPage/HomePage/Header';

const SingleMailInbox = (props) => {
    const navigate = useNavigate()

    const { state } = useLocation();
    console.log(state);


    return (
        <div className={classes.SingleMailInboxContainer}>
            <div className={classes.header}><Header /></div>
            <div className={classes.SingleMailInbox}>

                <div className={classes.subject}>Subject : <Markup content={state.subject} />  </div>

                <div className={classes.from}>{state.from} <Markup content={state.email} /> </div>

                <div className={classes.message}>Message :  <Markup content={state.message} /> </div>

                <div className={classes.sendContainer}><button onClick={() => navigate(-1)}>Back to Inbox</button></div>
            </div>
        </div>
    )
}

export default SingleMailInbox