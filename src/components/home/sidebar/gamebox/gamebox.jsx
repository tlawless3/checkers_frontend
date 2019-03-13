import React from 'react';
import './gamebox.css';
import { Board } from '../../../index'

const Gamebox = (props) => {
  const truncateDisplayName = (displayName) => {
    if (displayName.length > 15) {
      return displayName.substr(0, 12) + '...'
    } else {
      return displayName
    }
  }
  console.log(props.opponent)
  return (
    <div className={props.activeBoard ? 'boxWrapper activeBoard' : 'boxWrapper'} key={props.game.id} onClick={() => props.setActiveGame(props.game.id)}>
      <div className='boardWrapper'>
        <Board board={props.game.board} active={false} resolution={80} />
      </div>
      <div className='gameInfo'>
        <div>
          VS: {truncateDisplayName(props.opponent.userInfo.displayName)}
        </div>
        <div>
          Color: {props.game.playerColors.black === props.user.userId ? 'Black' : 'Red'}
        </div>
        <div>
          Status: {props.game.status}
        </div>
      </div>
    </div>
  )
}

export default Gamebox