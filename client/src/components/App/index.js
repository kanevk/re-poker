import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';

import { useQuery } from '@apollo/client';
import LobbyPage from '../LobbyPage';
import RoomPage from '../RoomPage';
import LoginPage from '../LoginPage';
import { TalkProvider } from '../TalkJS';

import styles from './index.module.scss';
import { GET_CURRENT_USER_QUERY } from '../../Graphql';

const cx = classNames.bind(styles);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  // TODO: handle outdated tokens
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const { data: { currentUser } = {}, refetch: refetchCurrentUser } = useQuery(
    GET_CURRENT_USER_QUERY
  );

  const handleSuccessLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    refetchCurrentUser();
  };

  return (
    <TalkProvider currentUser={currentUser} appId="tp5ifGlr">
      <div className={cx('main')}>
        <Router>
          <ScrollToTop />
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route
                exact
                path="/login"
                render={(routeProps) => (
                  <LoginPage
                    onSuccessLogin={handleSuccessLogin}
                    isAuthenticated={isAuthenticated}
                    {...routeProps}
                  />
                )}
              />
              <Route
                path="/"
                exact
                render={(routeProps) =>
                  isAuthenticated ? <LobbyPage {...routeProps} /> : <Redirect to="/login" />
                }
              />
              <Route
                path="/rooms/:roomId"
                exact
                render={(routeProps) =>
                  isAuthenticated ? (
                    <RoomPage {...routeProps} currentUser={currentUser} />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
            </Switch>
          </Suspense>
        </Router>
      </div>
    </TalkProvider>
  );
};

export default App;
