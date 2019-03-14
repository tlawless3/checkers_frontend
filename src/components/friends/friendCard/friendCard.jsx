import React from 'react';
import './friendCard.css';

const FriendCard = (props) => {
  const truncateDisplayName = (name) => {
    if (name.length > 20) {
      const result = name.substr(0, 17) + '...'
      return result
    }
    return name
  }

  return (
    <div className='friendCardWrapper'>
      {props.friend.status === 'recieved' ? <div className='acceptButton' onClick={() => props.handleAccept(props.friend.userInfo.id)}>accept request</div> : ''}
      <div className='declineButton' onClick={() => props.openDeleteModal(props.friend.userInfo.id)}><img alt='delete friend' src={require('../../../assets/exit.svg')}></img></div>
      <div className='infoWrapper'>
        <div className='displayName'>
          {truncateDisplayName(props.friend.userInfo.displayName)}
        </div>
        <div className='status'>
          {props.friend.status}
        </div>
      </div>
    </div>
  )
}

export default FriendCard;