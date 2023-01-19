import classes from '../MailHome.module.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


import React, { useEffect } from 'react'
import { mailDataAction } from '../../store/maildataSlice'
import SideBar from '../SideBar'

const SentMail = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const sentData = useSelector(state => state.mailData.outBox)
    const sortByLatest = [...sentData].reverse()
    const endpoint = localStorage.getItem('senderEmail');

    console.log('hello');

    async function getSentData() {
        const endpoint = localStorage.getItem('senderEmail');
        const url = `https://new-project-10d5a-default-rtdb.firebaseio.com/emailData/${endpoint}/sent.json`

        const outboxData = []
        const resp = await axios(url)
        const data = await resp.data;
        // console.log(data);


        for (let item in data) {

            outboxData.push({
                email: data[item].email,
                message: data[item].message,
                subject: data[item].subject,
                senderId: item


            })
        }

        dispatch(mailDataAction.getoutBoxData(outboxData))
        console.log(outboxData);


    }


    useEffect(() => {
        getSentData()
        console.log('hello');
    }, [])

    // console.log(sortByLatest);

    function singleMailHandler(mail) {
        // console.log(mail);
        navigate('/single', { state: mail })
    }
    

    function deleteHanlder(id) {
        // console.log(id);
        dispatch(mailDataAction.deleteFromOutbox(id))

        axios.delete(`https://new-project-10d5a-default-rtdb.firebaseio.com/emailData/${endpoint}/sent/${id}.json`)
            .then(res => console.log(res))


    }

    return (
        <div className={classes.AllEmails}>

            <div className={classes.sentMailTitle}><p>Sent Mails</p></div>

            {sortByLatest.map(item => {
                return (
                    <div key={item.senderId} className={classes.SingleEmailBox}>
                    
                        <div onClick={() => { singleMailHandler(item) }} className={classes.emailSubject}> {item.subject}</div>
                        <div onClick={() => { singleMailHandler(item) }} className={classes.emailDescription}>{item.message}</div>
                        <div  className={classes.deletebtnContainer}><button onClick={() => { deleteHanlder(item.senderId) }} className={classes.dltbtn}>Delete</button></div>


                    </div>
                )
            })}

        </div>
    )
}

export default SentMail