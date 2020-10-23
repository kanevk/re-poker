import React from 'react';
import { useMutation, useSubscription } from '@apollo/client';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import { Chatbox } from '../TalkJS';
import TurnMenu from './TurnMenu';
import Seat from './Seat';
import { imgSlugForCard } from './utils';
import { GameType } from './proptypes';
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

  const { currentGame: game, moveTimeLimit, users } = getRoom;

  return (
    <div className={cx('room')}>
      <Table game={game} moveTimeLimit={moveTimeLimit} />
      <div className={cx('footer')}>
        <Chatbox users={users} chatId={`poker-${roomId}`} fixedPosition="bottomLeft" />
        <div />
        {game.currentPlayer?.isInTurn && <TurnMenu minRaiseAmount={200} makeMove={makeMove} />}
      </div>
    </div>
  );
};

Table.propTypes = {
  game: GameType,
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

export default RoomPage;
