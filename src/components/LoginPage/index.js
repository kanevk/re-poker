import React, { useState } from "react";
import { SIGNIN_USER } from '../../mutations'

import classNames, { bind } from 'classnames/bind';
import styles from './index.module.scss';
import { useMutation } from "@apollo/client";
import { Redirect, useHistory } from "react-router-dom";

const cx = classNames.bind(styles);

const LoginPage = ({ onSuccessLogin, isAuthenticated }) => {
  const history = useHistory()
  const [login] = useMutation(SIGNIN_USER)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data: { signinUser: { userId, token } = {} } = {} } = await login({ variables: { username, password } })

    if (!token) return alert('Not correct username or pass')

    onSuccessLogin(token)
  }

  if (isAuthenticated) return <Redirect to='/' />

  return (
    <div className={cx('main')}>
      <form onSubmit={handleSubmit} >
        <input type='text' placeholder='username' value={username} onChange={(e) => { setUsername(e.target.value) }} />
        <input type='password' placeholder='password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
        <button type='submit'> Login </button>
      </form>
    </div>
  )
}

export default LoginPage
