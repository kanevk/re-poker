import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useSubscription } from '@apollo/client';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';

import TurnMenu from './TurnMenu';
import { GET_ROOM_SUBSCRIPTION, MAKE_MOVE_MUTATION } from '../../Graphql';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

const RoomPage = () => {
  const { roomId } = useParams();
  const { data: { getRoom } = {}, loading, error } = useSubscription(GET_ROOM_SUBSCRIPTION, {
    variables: { roomId },
  });

  const [_makeMove] = useMutation(MAKE_MOVE_MUTATION);

  const makeMove = ({ move, bet, xPlayerId }) => {
    _makeMove({
      variables: { input: { gameVersion: getRoom.currentGame.version, move, bet, xPlayerId } },
    });
  };

  // Hack for development
  // TODO: Replace this with something more sophisticated
  window.makeMove = makeMove;

  if (error) {
    throw new Error(error);
  }

  if (loading) {
    console.log('Loading...');
    return 'Loading...';
  }

  const { currentGame: game, moveTimeLimit } = getRoom;

  return (
    <div className={cx('room')}>
      <Table game={game} moveTimeLimit={moveTimeLimit} />
      <div className={cx('footer')}>
        <div />
        {game.currentPlayer?.isInTurn && <TurnMenu minRaiseAmount={200} makeMove={makeMove} />}
      </div>
    </div>
  );
};

const CardType = {
  color: PropTypes.string,
  rank: PropTypes.string.isRequired,
};

const PlayerType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  seatNumber: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  isInTurn: PropTypes.bool.isRequired,
  cards: PropTypes.arrayOf(CardType),
  position: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  moneyInPot: PropTypes.number.isRequired,
});

Table.propTypes = {
  game: PropTypes.shape({
    pot: PropTypes.number.isRequired,
    smallBlind: PropTypes.number.isRequired,
    bigBlind: PropTypes.number.isRequired,
    currentPlayer: PlayerType,
    players: PropTypes.arrayOf(PlayerType),
    boardCards: PropTypes.arrayOf(CardType),
  }),
  moveTimeLimit: PropTypes.number.isRequired,
};

function Table({ game, moveTimeLimit }) {
  console.log(game);

  return (
    <div className={cx('table')}>
      <div>
        <p>Pot: ${game.pot}</p>
        <p>Small blind: ${game.smallBlind}</p>
        <p>Big blind: ${game.bigBlind}</p>
        <p>Player in turn: {game.players.find(({ isInTurn }) => isInTurn).id}</p>
      </div>
      {game.players.map((player) => {
        if (game?.currentPlayer?.id === player.id) {
          return (
            <Seat
              key={player.seatNumber}
              player={game.currentPlayer}
              smallBlind={game.smallBlind}
            />
          );
        }
        return (
          <Seat
            key={player.seatNumber}
            player={player}
            smallBlind={game.smallBlind}
            moveTimeLimit={moveTimeLimit}
          />
        );
      })}
      <div className={cx('common-cards')}>
        {game.boardCards.map(imgSlugForCard).map((slug) => (
          <img className={cx('card')} src={`/cards/${slug}.png`} alt={slug} />
        ))}
      </div>
    </div>
  );
}

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
      return;
    }

    if (countdownSeconds <= 0) return;

    setTimeout(() => {
      setCountdownSeconds(countdownSeconds - 0.5);
    }, 500);
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

const imgSlugForCard = ({ rank, color }) => {
  if (rank === 'hidden') return 'back';

  const rankToPath = {
    A: '1',
    J: 'jack',
    Q: 'queen',
    K: 'king',
  };

  return `${color}_${rankToPath[rank] || rank}`;
};

export default RoomPage;
