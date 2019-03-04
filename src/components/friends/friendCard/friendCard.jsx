import React from 'react';
import './friendCard.css';

const FriendCard = (props) => {
  return (
    <div>
      {props.friend.status}
    </div>
  )
}

export default FriendCard;