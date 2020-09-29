
import React, { useCallback, useEffect, useState } from 'react';
import { gql, useMutation, useQuery, useSubscription } from '@apollo/client';
import { GET_CURRENT_ROOM } from '../../queries.js'

import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

const Room = ({ pusher }) => {
  const { roomId } = useParams()
  const { data: { getRoom } = {}, loading, error } = useSubscription(SUBSCRIPTION, { variables: { roomId } })
  const [_makeMove] = useMutation(TRIGGER_SUBSCRIPTION)

  const makeMove = ({ move, bet, xPlayerId }) => {
    _makeMove({ variables: { input: { gameVersion: getRoom.currentGame.version, move, bet, xPlayerId } } })
  }

  window.makeMove = makeMove;

  if (error) {
    throw new Error(error)
  }

  if (loading || !getRoom) {
    console.log('Loading...')
    return 'Loading...'
  }

  const { currentGame: game } = getRoom

  return (
    <div className={cx('room')} >
      <Table roomId={roomId} game={game} />
      <div className={cx('footer')}>
        <div></div>
        { game.currentPlayer?.isInTurn && <TurnMenu minRaiseAmount='200' makeMove={makeMove} /> }
      </div>
    </div>
  )
}

const SUBSCRIPTION = gql`
  subscription ($roomId: ID!) {
    getRoom(roomId: $roomId) {
      currentGame {
        version
        currentPlayer {
          id
          name
          isInTurn
          avatarUrl
          balance
          moneyInPot
          position
          seatNumber
          cards { rank color }
        }
        currentStage
        gameEnded
        smallBlind
        bigBlind
        pot
        boardCards { rank color }
        players {
          id
          name
          isInTurn
          avatarUrl
          balance
          moneyInPot
          position
          seatNumber
          cards { rank color }
        }
      }
    }
  }
`;


const TRIGGER_SUBSCRIPTION = gql`
  mutation ($input: MakeMoveInput!) {
    makeMove(input: $input) { success }
  }
`;

const Table = ({ roomId, game }) => {
  console.log(game)

  return (
    <div className={cx('table')}>
      <div>
        <p>Pot: ${game.pot}</p>
        <p>Small blind: ${game.smallBlind}</p>
        <p>Big blind: ${game.bigBlind}</p>
        <p>Player in turn: {game.players.find(({ isInTurn }) => isInTurn).id}</p>
      </div>
      {
        game.players.map((player) => {
          if (game?.currentPlayer?.id === player.id) {
            return <Seat key={player.seatNumber} player={game.currentPlayer} smallBlind={game.smallBlind}/>
          } else {
            return <Seat key={player.seatNumber} player={player} smallBlind={game.smallBlind}/>
          }
        })
      }
      <div className={cx('common-cards')}>
        {game.boardCards.map(imgSlugForCard).map((slug) =>
          <img className={cx('card')} src={`/cards/${slug}.png`} alt={slug} />
        )}
      </div>
    </div>
  )
}

const TurnMenu = ({ minRaiseAmount, makeMove }) => {
  const [raiseAmount, setRaiseAmount] = useState(minRaiseAmount)
  const handleRaiseRangeChange = useCallback((e) => { setRaiseAmount(e.target.value) }, [])

  return <div className={cx('turn-menu')}>
    <div className={cx('raise-amount-row')}>
      <input value={raiseAmount} size='5' onChange={handleRaiseRangeChange}/>
      <input type="range" id="raise-range" name="raise-range" value={raiseAmount} onChange={handleRaiseRangeChange} min={minRaiseAmount} max="1000"></input>
    </div>
    <div className={cx('buttons-row')}>
      <button className={cx('fold')} onClick={(e) => makeMove({ move: 'fold' })}>Fold</button>
      <button className={cx('call')} onClick={(e) => makeMove({ move: 'call' })}>Call</button>
      <button className={cx('raise')} onClick={(e) => makeMove({ move: 'raise', bet: raiseAmount })}> Raise {raiseAmount} </button>
    </div>
  </div>
}

const seatStyles = {
  0: { dealerClass: 'dealer-bottom-right', chipsClass: 'chips-bottom-right', seatClass: 'bottom-right', infoBoxPosition: 'left'},
  1: { dealerClass: 'dealer-middle-right', chipsClass: 'chips-middle-right', seatClass: 'middle-right', infoBoxPosition: 'center'},
  2: { dealerClass: 'dealer-top-right', chipsClass: 'chips-top-right', seatClass: 'top-right', infoBoxPosition: 'right'},
  3: { dealerClass: 'dealer-top-left', chipsClass: 'chips-top-left', seatClass: 'top-left', infoBoxPosition: 'right'},
  4: { dealerClass: 'dealer-middle-left', chipsClass: 'chips-middle-left', seatClass: 'middle-left', infoBoxPosition: 'center'},
  5: { dealerClass: 'dealer-bottom-left', chipsClass: 'chips-bottom-left', seatClass: 'bottom-left', infoBoxPosition: 'left'},
}

const PlayerChips = ({ smallBlind, betAmount, classes }) => {
  const blackChipValue = 10 * smallBlind;
  const blueChipValue = smallBlind;

  const blackChipsCount = parseInt(betAmount / blackChipValue);
  const blueChipsCount = parseInt((betAmount - blackChipsCount * blackChipValue) / blueChipValue);
  console.log(betAmount);
  // if (blackChipsCount && blueChipsCount) debugger
  return (
    <div className={cx(['chips-container', ...classes])}>
      <div className={cx('chip-column')}>
        {
          !!blackChipsCount &&
          Array.from({ length: blackChipsCount }, () =>
            <img src="/chips/chip-black.png" alt="blue-chip" className={cx('chip')}/>)
        }
      </div>
      <div className={cx('chip-column')}>
        {
          !!blueChipsCount &&
          Array.from({ length: blueChipsCount }, () =>
            <img src="/chips/chip-blue.png" alt="blue-chip" className={cx('chip')}/>)
        }
      </div>
    </div>
  )
}

const Seat = ({ player, smallBlind }) => {
  const [countdownSeconds, setCountdownSeconds] = useState(15)
  const firstCard = player.cards[0] || { rank: 'back' }, secondCard = player.cards[1] || { rank: 'back' };

  useEffect(() => {
    if (!player.isInTurn) return setCountdownSeconds(15)
    if (countdownSeconds <= 0) return

    setTimeout(() => {
      console.log(countdownSeconds)
      setCountdownSeconds(countdownSeconds - 0.5)
    },
    500)
  }, [player.isInTurn, countdownSeconds])

  const { seatClass, infoBoxPosition, dealerClass, chipsClass } = seatStyles[player.seatNumber];
  const countdownClasses = cx({ 'time-bar': true, 'red': countdownSeconds < 5 })

  return (
    <div>
      { player.position === 'D' && <img src={`/chips/chip-dealer.png`} alt="dealer-chip" className={cx('dealer-chip', dealerClass)}/> }
      <PlayerChips classes={[chipsClass]} smallBlind={smallBlind} betAmount={player.moneyInPot} />
      <div className={cx('seat', seatClass)}>
        <div className={cx('avatar')}> <img src='/avatars/business-man-avatar.png' alt='business-man-avatar'/> </div>
        <div className={cx('info-box', infoBoxPosition)}>
          <span>{player.name}</span>
          <span>${player.balance}</span>
          <div className={cx('cards-wrapper')}>
            <img src={`/cards/${imgSlugForCard(firstCard)}.png`}
                alt={imgSlugForCard(firstCard)}
                className={cx({ card: true, raised: !!firstCard})}/>
            <img src={`/cards/${imgSlugForCard(secondCard)}.png`}
                alt={imgSlugForCard(firstCard)}
                className={cx({ kcard: true, raised: !!secondCard })}/>
          </div>
          {
            player.isInTurn ? <progress value={countdownSeconds * 2} max='30' className={countdownClasses}></progress> : null
          }
        </div>
      </div>
    </div>
  )
}

const imgSlugForCard = ({ rank, color }) => {
  if (rank === 'back') return "back"

  const rankToPath = {
    'A': '1',
    'J': 'jack',
    'Q': 'queen',
    'K': 'king',
  }

  return `${color}_${rankToPath[rank] || rank}`
}


export default Room;
