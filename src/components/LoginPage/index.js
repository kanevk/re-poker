import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useMutation } from '@apollo/client';
import { Redirect } from 'react-router-dom';

import styles from './index.module.scss';
import { SIGNIN_USER_MUTATON } from '../../Graphql';

const cx = classNames.bind(styles);

const LoginPage = ({ onSuccessLogin, isAuthenticated }) => {
  const [login] = useMutation(SIGNIN_USER_MUTATON);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: { signinUser: { token } = {} } = {} } = await login({
      variables: { username, password },
    });

    if (!token) {
      alert('Not correct username or pass');
      return;
    }

    onSuccessLogin(token);
  };

  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <div className={cx('main')}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit"> Login </button>
      </form>
    </div>
  );
};

LoginPage.propTypes = {
  onSuccessLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default LoginPage;
