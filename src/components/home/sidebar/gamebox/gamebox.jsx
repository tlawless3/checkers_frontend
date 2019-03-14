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

  const generateStatus = (status) => {
    // ['blackTurn', 'redTurn', 'redWin', 'blackWin', 'draw', 'waitingBlack', 'waitingRed'],
    if (status !== 'waitingBlack' && status !== 'waitingRed') {
      const statuses = {
        redTurn: 'Red Turn',
        blackTurn: 'Black Turn',
        redWin: 'Red Win',
        blackWin: 'Black Win',
        draw: 'Draw'
      }
      return statuses[status]
    } else {
      const playerColor = props.game.playerColors.black === props.user.userId ? 'black' : 'red'
      if (status === 'waitingBlack' && playerColor === 'black') {
        return 'Received'
      } else if (status === 'waitingRed' && playerColor === 'red') {
        return 'Received'
      } else {
        return 'Sent'
      }
    }
  }

  return (
    <div className={props.activeBoard ? 'boxWrapper activeBoard' : 'boxWrapper'} key={props.game.id} onClick={() => props.setActiveGame(props.game.id)}>
      {(props.game.status === 'redWin' || props.game.status === 'blackWin' || props.game.status === 'draw') ? (<div className='deleteGame'><img src={require('../../../../assets/exit.svg')}></img></div>) : ''}
      {((props.game.status === 'waitingBlack' && (props.game.playerColors.black === props.user.userId)) || (props.game.status === 'waitingRed' && (props.game.playerColors.red === props.user.userId))) ? (<div className='acceptGame'>Accept</div>) : ''}
      {(props.game.status === 'redTurn' || props.game.status === 'blackTurn') ? (<div className='forefitGame'>Forefit</div>) : ''}
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
          Status: {generateStatus(props.game.status)}
        </div>
      </div>
    </div>
  )
}

export default Gamebox