import React from 'react';
import './addFriendModal.css';

const addFriendModal = (props) => {

  return (
    <div className='addFriendModalWrapper'>
      <div className='addFriendModalBackground' onClick={props.closeAddModal}></div>
      <div className='modal'>
        <div className='confirmText'>
          Are you sure you want to delete this friend?
        </div>
        <div className='deleteButton' onClick={props.handleAdd}>
          Delete
        </div>
      </div>
    </div>
  )
}

export default addFriendModal;