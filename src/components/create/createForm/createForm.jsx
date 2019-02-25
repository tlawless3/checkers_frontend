import React from 'react';
import './createForm.css';

const CreateForm = (props) => {
  return (
    <div className='wrapper'>
      <div className='formWrapper'>
        {!props.error || <div className='error'>error logging in</div>}
        <div className='createHeader'>
          Create an Account:
      </div>
        <form onSubmit={props.handleCreate}>
          <input type='text' name='username' placeholder='username' />
          <input type='text' name='displayName' placeholder='display name' />
          <input type='text' name='email' placeholder='email' />
          <input type='password' name='password' placeholder='password' />
          <input type='password' name='passwordConfirm' placeholder='confirm password' />
          <button type='submit'> Create and Login </button>
        </form>
      </div>
    </div>
  )
}

export default CreateForm