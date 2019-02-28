import React from 'react';
import './sidebar.css';
import Gamebox from './gamebox/gamebox'

const Sidebar = (props) => {
  return (
    <div className='sidebarWrapper'>
      {props.games.map(gameData => {
        return (<Gamebox key={gameData.id} setActiveGame={props.setActiveGame} game={gameData} />)
      })}
    </div>
  )
}

export default Sidebar