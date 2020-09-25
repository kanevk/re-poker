import React, { Suspense, useEffect, useState } from "react";
import { Router, Route, Switch, Redirect, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { createBrowserHistory } from "history";
import Room from '../Room'
import LoginPage from '../LoginPage'
import { IS_AUTHENTICATED_QUERY, GET_ROOMS } from '../../queries'

import classNames from 'classnames/bind';
import styles from './index.module.scss';

const cx = classNames.bind(styles);


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const history = createBrowserHistory();

const HomePage = () => {
  const { data: { rooms } = {}, loading } = useQuery(GET_ROOMS)

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <ul>
        {
          rooms.map((room) => {
            return (
              <li key={room.id}>
                <Link to={`rooms/${room.id}`}> Room /{room.name}/ </Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

const App = () => {
  // TODO: handle outdated tokens
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleSuccessLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  }

  return (
    <div className={cx('main')}>
      <Router history={history}>
        <ScrollToTop/>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/login" render={(routeProps) => <LoginPage onSuccessLogin={handleSuccessLogin} isAuthenticated={isAuthenticated} {...routeProps} /> } />
            <Route path="/" exact render={(routeProps) => isAuthenticated ? <HomePage {...routeProps} /> : <Redirect to='/login' />} />
            <Route path="/rooms/:roomId"  exact render={(routeProps) => isAuthenticated ? <Room {...routeProps} /> : <Redirect to='/login' />} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
