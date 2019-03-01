import React from 'react';
import './gamebox.css';
import { Board } from '../../../index'

const Gamebox = (props) => {
  return (
    <div className='boxWrapper' onClick={() => props.setActiveGame(props.game.id)}>
      <div className='boardWrapper'>
        <Board board={props.game.board} active={false} resolution={80} />
      </div>
      <div className='gameInfo'>
        <div>
          {props.game.playerColors.black === props.user.userId ? 'Black' : 'Red'}
        </div>
        <div>
          Status: {props.game.status}
        </div>
      </div>
    </div>
  )
}

export default Gamebox