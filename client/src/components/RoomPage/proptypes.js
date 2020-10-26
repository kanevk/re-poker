import PropTypes from 'prop-types';

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

const GameType = PropTypes.shape({
  pot: PropTypes.number.isRequired,
  smallBlind: PropTypes.number.isRequired,
  bigBlind: PropTypes.number.isRequired,
  currentPlayer: PlayerType,
  players: PropTypes.arrayOf(PlayerType),
  boardCards: PropTypes.arrayOf(CardType),
});

export { PlayerType, GameType, CardType };
