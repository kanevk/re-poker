
import React from 'react';
import hackerAvatar from './hacker-avatar.png'
import businessWomanAvatar from './business-woman-avatar.png'
import businessManAvatar from './business-man-avatar.png'
import fatherAvatar from './father-avatar.png'
import faceMaskAvatar from './face-mask-avatar.png'
import longHairAvatar from './long-hair-avatar.png'

import classNames from 'classnames/bind';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

const Room = () => {
  return (
    <div className={cx('room')} >
      <Table />
      <div className={cx('footer')}>
        <div></div>
        <TurnMenu minRaiseAmount='200' />
      </div>
    </div>
  )
}

const Table = () => {
  const players = [
    { name: 'Loli', tableTotal: '23.42', cards: ['10s', 'Ah'] },
    { name: 'Cat422', tableTotal: '103.10', cards: ['x', 'As'] },
    { name: 'TheGodFather', tableTotal: '0.90', cards: ['x', 'x'] },
    { name: 'a_am_ill', tableTotal: '100', cards: ['x', 'x'] },
    { name: 'longy-dongy1', tableTotal: '1000', cards: ['x', 'x'] },
    { name: 'nice-cut-pink', tableTotal: '1529.44', cards: ['x', 'x'] },
  ]

  const cards = ['7h', 'As', 'Kh', 'Ah', 'Ks']

  const cardImgSlugs = cards.map((card) => {
    if (card === 'x') return 'back-red'

    const rank = card.slice(0, card.length - 1)
    const color = card[card.length - 1]

    const colorToPath = {
      'c': 'club',
      's': 'spade',
      'h': 'heart',
      'd': 'diamond',
    }

    const rankToPath = {
      'A': '1',
      'J': 'jack',
      'Q': 'queen',
      'K': 'king',
    }

    return `${colorToPath[color]}_${rankToPath[rank] || rank}`
  })


  return (
    <div className={cx('table')}>
      <Seat position='top-left' avatarSrc={hackerAvatar} infoBoxPosition='right' player={players[0]} />
      <Seat position='top-right' avatarSrc={businessWomanAvatar} infoBoxPosition='right' player={players[1]} />
      <Seat position='middle-left' avatarSrc={fatherAvatar} infoBoxPosition='center' player={players[2]} />
      <Seat position='middle-right' avatarSrc={faceMaskAvatar} infoBoxPosition='center' player={players[3]} />
      <Seat position='bottom-left' avatarSrc={longHairAvatar} infoBoxPosition='left' player={players[4]} />
      <Seat position='bottom-right' avatarSrc={businessManAvatar} infoBoxPosition='left' player={players[5]} />
      <div className={cx('common-cards')}>
        {cardImgSlugs.map((slug) =>
          <img className={cx('card')} src={`/cards/${slug}.png`} alt={slug} />
        )}
      </div>
    </div>
  )
}

const TurnMenu = ({minRaiseAmount}) => {
  return <div className={cx('turn-menu')}>
    <div className={cx('raise-amount-row')}>
      <input value='200' size='5'/>
      <input type="range" id="raise-range" name="raise-range" min={minRaiseAmount} max="1000"></input>
    </div>
    <div className={cx('buttons-row')}>
      <button className={cx('fold')} >Fold</button>
      <button className={cx('call')} >Call</button>
      <button className={cx('raise')}> Raise {minRaiseAmount} </button>
    </div>
  </div>
}

const Seat = ({position, avatarSrc, infoBoxPosition, player}) => {
  const cardImgPaths = player.cards.map((card) => {
    if (card === 'x') return '/cards/back-red.png'

    const rank = card.slice(0, card.length - 1)
    const color = card[card.length - 1]

    const colorToPath = {
      'c': 'club',
      's': 'spade',
      'h': 'heart',
      'd': 'diamond',
    }

    const rankToPath = {
      'A': '1',
      'J': 'jack',
      'Q': 'queen',
      'K': 'king',
    }

    return `/cards/${colorToPath[color]}_${rankToPath[rank] || rank}.png`
  })

  return (
    <div className={cx('seat', position)}>
      <div className={cx('avatar')}> <img src={avatarSrc} alt={avatarSrc}/> </div>
      <div className={cx('info-box', infoBoxPosition)}>
        <span>{player.name}</span>
        <span>${player.tableTotal}</span>
        <div className={cx('cards-wrapper')}>
          <img src={cardImgPaths[0]} alt='back' className={cx('card')}/>
          <img src={cardImgPaths[1]} alt='back' className={cx('card')}/>
        </div>
      </div>
    </div>
  )
}


export default Room;
