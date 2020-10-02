import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

const TurnMenu = ({ minRaiseAmount, makeMove }) => {
  const [raiseAmount, setRaiseAmount] = useState(minRaiseAmount);
  const handleRaiseRangeChange = useCallback((e) => {
    setRaiseAmount(parseInt(e.target.value, 10));
  }, []);

  return (
    <div className={cx('turn-menu')}>
      <div className={cx('raise-amount-row')}>
        <input value={raiseAmount} size="5" onChange={handleRaiseRangeChange} />
        <input
          type="range"
          id="raise-range"
          name="raise-range"
          value={raiseAmount}
          onChange={handleRaiseRangeChange}
          min={minRaiseAmount}
          max="1000"
        />
      </div>
      <div className={cx('buttons-row')}>
        <button type="button" className={cx('fold')} onClick={(_e) => makeMove({ move: 'fold' })}>
          Fold
        </button>
        <button type="button" className={cx('call')} onClick={(_e) => makeMove({ move: 'call' })}>
          Call
        </button>
        <button
          type="button"
          className={cx('raise')}
          onClick={() => makeMove({ move: 'raise', bet: raiseAmount })}
        >
          Raise {raiseAmount}
        </button>
      </div>
    </div>
  );
};

TurnMenu.propTypes = {
  minRaiseAmount: PropTypes.number.isRequired,
  makeMove: PropTypes.func.isRequired,
};

export default TurnMenu;
