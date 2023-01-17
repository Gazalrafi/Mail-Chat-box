import classes from './MailHome.module.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { mailDataAction } from '../store/maildataSlice';
import { useNavigate } from 'react-router-dom'
import { Markup } from 'interweave';




import React, { useEffect, useState } from 'react'

const AllEmails = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const Data = useSelector(state => state.mailData.inboxData)
    const sortByLatest = [...Data].reverse()
    // const readMail = useSelector(state => state.mailData.inboxData);
    // const sortByLatesreadMail = readMail.reverse()
    // const Datas = useSelector(state => state.mailData)
    const endpoint = localStorage.getItem('senderEmail');




    useEffect(() => {
        const getInboxData = setInterval(() => {
            // let data;

            const url = `https://new-project-10d5a-default-rtdb.firebaseio.com/emailData/${endpoint}/received.json`

            const inboxData = []
            const resp = axios(url).then(resp => resp.data).then(data => {
                for (let item in data) {

                    inboxData.push({
                        email: data[item].email,
                        message: data[item].message,
                        subject: data[item].subject,
                        senderId: item,
                        isRead: data[item].isRead

                    })

                    // console.log(inboxData[0].isRead);


                }

                dispatch(mailDataAction.getInboxData(inboxData))
                dispatch(mailDataAction.getTotalUnreadMsg(inboxData))


            })



        }, 1000)

        // getInboxData()
        // console.log('hello');
        return () => clearInterval(getInboxData);
    }, [dispatch])






    function mailHandler(mail) {
        console.log(mail);
        if (mail.isRead) {
            navigate('/single', { state: mail })
            return;

        }


        axios.put(`https://new-project-10d5a-default-rtdb.firebaseio.com/emailData/${endpoint}/received/${mail.senderId}.json`, {
            email: mail.email,
            message: mail.message,
            subject: mail.subject,

            isRead: true
        })
            .then(res => console.log(res))



        navigate('/single', { state: { ...mail, from: 'From:' } })




    }

    function deleteHanlder(id) {
        console.log(id);
        dispatch(mailDataAction.deleteFromInbox(id))

        axios.delete(`https://new-project-10d5a-default-rtdb.firebaseio.com/emailData/${endpoint}/received/${id}.json`)
            .then(res => console.log(res))


    }

    // console.log(Totalunreadmsg);


    return (
        <div className={classes.AllEmails}>
            <div className={classes.sentMailTitle}><p>Inbox</p></div>

            {sortByLatest.map((mail, i) => {

                return (<div key={mail.senderId} className={classes.SingleEmailBox}>
                    <div style={{
                        height: !sortByLatest[i].isRead ? '12px' : '',
                        width: !sortByLatest[i].isRead ? '12px' : '',
                        borderRadius: !sortByLatest[i].isRead ? '12px' : '',
                        backgroundColor: !sortByLatest[i].isRead ? `rgba(64, 107, 169, 1)` : 'white'

                    }}></div>
                    <div onClick={() => { mailHandler(mail) }} className={classes.emailSubject}> <Markup content={mail.subject} /></div>
                    <div className={classes.message}>
                        <Markup content={mail.message} />
                    </div>
                    <div className={classes.deletebtnContainer}><button onClick={() => { deleteHanlder(mail.senderId) }} className={classes.dltbtn}>Delete</button></div>
                </div>)


            })}




        </div>
    )
}

export default AllEmails