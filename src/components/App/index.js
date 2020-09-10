import React from 'react';
import Table from '../Table'

import classNames from 'classnames/bind';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

const App = () => {
  return (
    <div className={cx('main')}>
      <Table />
    </div>
  );
}

export default App;
