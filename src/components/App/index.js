import React from 'react';
import Room from '../Room'

import classNames from 'classnames/bind';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

const App = () => {
  return (
    <div className={cx('main')}>
      <Room />
    </div>
  );
}

export default App;
