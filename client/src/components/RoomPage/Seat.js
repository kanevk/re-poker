import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { imgSlugForCard } from './utils';
import { PlayerType } from './proptypes';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

const seatStyles = {
  0: {
    dealerClass: 'dealer-bottom-right',
    chipsClass: 'chips-bottom-right',
    seatClass: 'bottom-right',
    infoBoxPosition: 'left',
  },
  1: {
    dealerClass: 'dealer-middle-right',
    chipsClass: 'chips-middle-right',
    seatClass: 'middle-right',
    infoBoxPosition: 'center',
  },
  2: {
    dealerClass: 'dealer-top-right',
    chipsClass: 'chips-top-right',
    seatClass: 'top-right',
    infoBoxPosition: 'right',
  },
  3: {
    dealerClass: 'dealer-top-left',
    chipsClass: 'chips-top-left',
    seatClass: 'top-left',
    infoBoxPosition: 'right',
  },
  4: {
    dealerClass: 'dealer-middle-left',
    chipsClass: 'chips-middle-left',
    seatClass: 'middle-left',
    infoBoxPosition: 'center',
  },
  5: {
    dealerClass: 'dealer-bottom-left',
    chipsClass: 'chips-bottom-left',
    seatClass: 'bottom-left',
    infoBoxPosition: 'left',
  },
};

PlayerChips.propTypes = {
  smallBlind: PropTypes.number.isRequired,
  betAmount: PropTypes.number.isRequired,
  classes: PropTypes.arrayOf(PropTypes.string).isRequired,
};
function PlayerChips({ smallBlind, betAmount, classes }) {
  const blackChipValue = 10 * smallBlind;
  const blueChipValue = smallBlind;

  const blackChipsCount = parseInt(betAmount / blackChipValue, 10);
  const blueChipsCount = parseInt(
    (betAmount - blackChipsCount * blackChipValue) / blueChipValue,
    10
  );

  return (
    <div className={cx(['chips-container', ...classes])}>
      <div className={cx('chip-column')}>
        {!!blackChipsCount &&
          Array.from({ length: blackChipsCount }, () => (
            <img src="/chips/chip-black.png" alt="blue-chip" className={cx('chip')} />
          ))}
      </div>
      <div className={cx('chip-column')}>
        {!!blueChipsCount &&
          Array.from({ length: blueChipsCount }, () => (
            <img src="/chips/chip-blue.png" alt="blue-chip" className={cx('chip')} />
          ))}
      </div>
    </div>
  );
}

Seat.propTypes = {
  player: PlayerType,
  smallBlind: PropTypes.bool.isRequired,
  moveTimeLimit: PropTypes.number.isRequired,
};
function Seat({ player, smallBlind, moveTimeLimit }) {
  const [countdownSeconds, setCountdownSeconds] = useState(moveTimeLimit);
  const firstCard = player.cards[0];
  const secondCard = player.cards[1];

  useEffect(() => {
    if (!player.isInTurn) {
      setCountdownSeconds(moveTimeLimit);
      return () => {};
    }

    if (countdownSeconds <= 0) return () => {};

    const tid = setTimeout(() => {
      setCountdownSeconds(countdownSeconds - 0.5);
    }, 500);

    return () => {
      clearTimeout(tid);
    };
  }, [player.isInTurn, countdownSeconds]);

  const { seatClass, infoBoxPosition, dealerClass, chipsClass } = seatStyles[player.seatNumber];
  const countdownClasses = cx({ 'time-bar': true, red: countdownSeconds < 3 });
  const seatClasses = cx({ seat: true, [seatClass]: true, inactive: !player.active });

  return (
    <div key={player.id}>
      {player.position === 'D' && (
        <img
          src="/chips/chip-dealer.png"
          alt="dealer-chip"
          className={cx('dealer-chip', dealerClass)}
        />
      )}
      <PlayerChips classes={[chipsClass]} smallBlind={smallBlind} betAmount={player.moneyInPot} />
      <div className={seatClasses}>
        <div className={cx('avatar')}>
          {' '}
          <img src="/avatars/business-man-avatar.png" alt="business-man-avatar" />{' '}
        </div>
        <div className={cx('info-box', infoBoxPosition)}>
          <span>{player.name}</span>
          <span>${player.balance}</span>
          <div className={cx('cards-wrapper')}>
            <img
              src={`/cards/${imgSlugForCard(firstCard)}.png`}
              alt={imgSlugForCard(firstCard)}
              className={cx({ card: true, raised: !!firstCard })}
            />
            <img
              src={`/cards/${imgSlugForCard(secondCard)}.png`}
              alt={imgSlugForCard(firstCard)}
              className={cx({ kcard: true, raised: !!secondCard })}
            />
          </div>
          {player.isInTurn ? (
            <progress
              value={countdownSeconds * 2}
              max={moveTimeLimit * 2}
              className={countdownClasses}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Seat;
