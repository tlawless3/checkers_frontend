import React from 'react';
import './deleteFriendModal.css';

const deleteFriendModal = (props) => {

  return (
    <div className='deleteFriendModalWrapper'>
      <div className='deleteFriendModalBackground' onClick={props.closeDeleteModal}></div>
      <div className='modal'>
        <div className='confirmText'>
          Are you sure you want to delete this friend?
        </div>
        <div className='deleteButton' onClick={props.handleDelete}>
          Delete
        </div>
      </div>
    </div>
  )
}

export default deleteFriendModal;