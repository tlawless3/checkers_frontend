import React from 'react';
import './sidebar.css';
import Gamebox from './gamebox/gamebox'

const Sidebar = (props) => {
  const generateSidebar = () => {
    let usedBoards = []
    let components = []
    props.games.map(gameData => {
      if (!usedBoards.includes(gameData.id)) {
        usedBoards.push(gameData.id)
        if (gameData.id === props.activeGameId) {
          components.unshift(<Gamebox key={gameData.id} activeBoard={true} user={props.user} setActiveGame={props.setActiveGame} game={gameData} />)
        } else {
          components.push(<Gamebox key={gameData.id} user={props.user} setActiveGame={props.setActiveGame} game={gameData} />)
        }
      }
    })
    //change this later to deal with status
    return components
  }
  return (
    <div className='sidebarWrapper'>
      {generateSidebar()}
    </div>
  )
}

export default Sidebar