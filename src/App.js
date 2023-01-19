import React, { Fragment, useEffect, useState } from 'react'
import AuthPage from './components/AuthPage/AuthPage'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import ComposeEmail from './components/ComposeEmail/ComposeEmail'
import MailHome from './components/MailHome/MailHome'
import SentMail from './components/MailHome/SentMail/SentMail'
import { useSelector } from 'react-redux'
import SingleMailInbox from './components/MailHome/SingleMailInbox/SingleMailInbox'
import ForgetPassword from './components/AuthPage/ForgetPassword'

const App = () => {
  // const endpoint = localStorage.getItem('senderEmail');
  // const Data = useSelector(state => state.mailData.inboxData)

  const rdxLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const [isLoggedIn, setisLoggedIn] = useState(rdxLoggedIn);

  return (
    <Fragment>

      <BrowserRouter>
        <Routes>
          {(isLoggedIn || localStorage.getItem('senderEmail')) && <Route path='/' element={<MailHome />} />}
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/compose' element={<ComposeEmail />} />
          <Route path='/sentmail' element={<SentMail />} />
          <Route path='/single' element={<SingleMailInbox />} />
          {!isLoggedIn &&<Route path='/forget' element={<ForgetPassword/>}/>}
          <Route path="*" element={<Navigate to='/auth' replace />} />

        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default App