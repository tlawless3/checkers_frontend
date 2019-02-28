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
        components.push(<Gamebox key={gameData.id} user={props.user} setActiveGame={props.setActiveGame} game={gameData} />)
      }
    })
    //change this later to deal with status
    components = components.sort((a, b) => {
      return (a.id - b.id)
    })
    return components
  }
  return (
    <div className='sidebarWrapper'>
      {generateSidebar()}
    </div>
  )
}

export default Sidebar