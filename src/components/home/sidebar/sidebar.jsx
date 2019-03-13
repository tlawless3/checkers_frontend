import React from 'react';
import './sidebar.css';
import Gamebox from './gamebox/gamebox'

const Sidebar = (props) => {
  const generateSidebar = () => {
    let usedBoards = []
    let components = []
    props.games.map(gameData => {
      let friendInfo = props.friends.find(friend => {
        if (gameData.playerColors.black === props.user.userId) {
          return friend.userInfo.friendId == gameData.playerColors.red
        } else if (gameData.playerColors.red === props.user.userId) {
          return friend.userInfo.friendId == gameData.playerColors.black
        }
      })
      console.log('this', friendInfo)
      if (!friendInfo) {
        friendInfo = { userInfo: { displayName: 'AI' } }
      }
      if (!usedBoards.includes(gameData.id)) {
        usedBoards.push(gameData.id)
        if (gameData.id === props.activeGameId) {
          components.unshift(<Gamebox key={gameData.id} opponent={friendInfo} activeBoard={true} user={props.user} setActiveGame={props.setActiveGame} game={gameData} />)
        } else {
          components.push(<Gamebox key={gameData.id} opponent={friendInfo} user={props.user} setActiveGame={props.setActiveGame} game={gameData} />)
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