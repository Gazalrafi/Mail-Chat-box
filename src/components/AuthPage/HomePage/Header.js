import React from 'react'
import classes from './Header.module.css'
import { useNavigate } from 'react-router-dom'


const Header = () => {
    const navigate = useNavigate()

    const email = localStorage.getItem('originalEmail')

    function logoutHandler() {
        localStorage.removeItem('senderEmail')
        localStorage.removeItem('token')
        localStorage.removeItem('originalEmail')
        navigate('/auth')


    }

    return (
        <div className={classes.Header}>
            <div className={classes.mailTitle}><h1>Yahoo Mail </h1></div>
            <div>
                <button onClick={logoutHandler}>Logout</button>
            </div>

        </div>
    )
}

export default Header