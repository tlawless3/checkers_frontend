import React from 'react';
import './gamebox.css';
import { Board } from '../../../index'

const Gamebox = (props) => {
  return (
    <div onClick={() => props.setActiveGame(props.game.id)}>
      <Board board={props.game.board} active={false} resolution={80} />
    </div>
  )
}

export default Gamebox