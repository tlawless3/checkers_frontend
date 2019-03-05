import React from 'react';
import './addFriendModal.css';

const addFriendModal = (props) => {

  return (
    <div className='addFriendModalWrapper'>
      <div className='addFriendModalBackground' onClick={props.closeAddModal}></div>
      <div className='modal'>
        {props.addError ? (<div className='addError'>Cannot find user</div>) : ''}
        Enter your friend's username:
        <form className='addFriendForm'>
          <input type='text' placeholder='username' onChange={(event) => props.handleUsernameChange(event)} name='username'></input>
          <button type='submit' onClick={(event) => props.handleAdd(event)}>Add Friend</button>
        </form>
      </div>
    </div>
  )
}

export default addFriendModal;