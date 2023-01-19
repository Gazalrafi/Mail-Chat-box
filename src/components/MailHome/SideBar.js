import classes from './SideBar.module.css'



import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'


const SideBar = (props) => {

    const unreadNumber = useSelector(state => state.mailData.Totalunreadmsg)


    function inboxBtnHandler() {
        props.toggle(true)
    }
    function sentBtnHandler() {
        props.toggle(false)
    }


    return (
        <div className={classes.SideBar}>
            <div className={classes.composeButton}
            >
                <div><button onClick={inboxBtnHandler} style={{ backgroundColor: 'black' }}>Inbox {unreadNumber}</button>
                </div>
                <div>
                    <NavLink to='/compose'>
                        <button>Compose</button></NavLink>
                </div>
                <div>

                    <button onClick={sentBtnHandler}>Sent</button>
                </div>



            </div>

        </div>
    )
}

export default SideBar