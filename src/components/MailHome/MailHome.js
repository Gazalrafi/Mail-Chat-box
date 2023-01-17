import classes from './MailHome.module.css'

import React, { useState } from 'react'

import SideBar from './SideBar'
import AllEmails from './AllEmails'
import Header from '../AuthPage/HomePage/Header'


import SentMail from './SentMail/SentMail'




const MailHome = () => {
    const [toggle, setToggle] = useState(true)

    function toggleInbox(value) {
        setToggle(value)
    }
    return (
        <div>
            <Header />
            <div className={classes.MailBodyContainer}>
                <SideBar toggle={toggleInbox} />
                {toggle && <AllEmails />}
                {!toggle && <SentMail />}


            </div>
        </div>
    )
}

export default MailHome