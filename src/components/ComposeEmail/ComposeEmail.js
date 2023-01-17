import React, { useRef, useState } from 'react'
import classes from './ComposeEmail.module.css'

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import JoditEditor from 'jodit-react';
import { useNavigate } from 'react-router-dom'


const ComposeEmail = () => {

    const textRef = useRef(null);
    const navigate = useNavigate()
    const emailRef = useRef()
    const subjectRef = useRef()
    const [content, setContent] = useState('');

    const config = {
        placeholder: "Enter Email",
        buttons: ["bold", "italic", "underline", "link", "unlink", "source"]
    }

    async function sendEmailHandler() {

        const senderEmail = localStorage.getItem('senderEmail')
        const sendMailId = emailRef.current.value

        const SendMailEndPoint = `${sendMailId.replace(/\.|@/g, '')}`
        console.log(SendMailEndPoint);


        const url = `https://new-project-10d5a-default-rtdb.firebaseio.com/emailData/${senderEmail}/sent.json`;


        const resp = await fetch(url, {

            method: 'POST',
            headers: {

                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailRef.current.value,
                subject: subjectRef.current.value,
                message: textRef.current.value

            })
        }
        )

        if (!resp.ok) {
            console.log('error');


        }

        else {

            const url = `https://new-project-10d5a-default-rtdb.firebaseio.com/emailData/${SendMailEndPoint}/received.json`;


            const resp = await fetch(url, {

                method: 'POST',
                headers: {

                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailRef.current.value,
                    subject: subjectRef.current.value,
                    message: textRef.current.value,
                    isRead: false

                })
            }
            )

            if (!resp.ok) {
                console.log('error');
            }
            else {
                navigate('/')
            }

        }




    }

    return (
        <div className={classes.ComposeEmail}>
            <div className={classes.headerContainer}>
                <div className={classes.receiverMail}>
                    <input type='email' ref={emailRef} placeholder='adbc@gmail.com' />
                </div>
                <div className={classes.subject}>
                    <input ref={subjectRef} type='text' placeholder='Test mail' />

                </div>
            </div>
            <div className={classes.editorBox}>
                <JoditEditor
                    ref={textRef}
                    value={content}
                    config={config}

                    tabIndex={1} // tabIndex of textarea
                    onBlur={newContent => setContent(newContent)}
                    onChange={newContent => { }}
                />
            </div>

            {content}

            <div className={classes.sendContainer}><button onClick={sendEmailHandler}>Send Mail</button></div>

        </div>
    )
}

export default ComposeEmail