import React from 'react';
import './createForm.css';

const CreateForm = (props) => {
  return (
    <div className='wrapper'>
      <div className='formWrapper'>
        <div className='createHeader'>
          Create an Account:
        </div>
        <form onSubmit={props.handleCreate}>
          <input type='text' onChange={props.handleChange} name='username' placeholder='username' />
          <input type='text' onChange={props.handleChange} name='displayName' placeholder='display name (optional)' />
          <input type='text' onChange={props.handleChange} name='email' placeholder='email (optional)' />
          <input type='password' onChange={props.handleChange} name='password' placeholder='password' />
          <input type='password' onChange={props.handleChange} name='passwordConfirm' placeholder='confirm password' />
          <button type='submit'> Create and Login </button>
        </form>
      </div>
      {
        !props.error ||
        (<div className='errorMessage'>
          {props.errorMessage}
        </div>)
      }
    </div>
  )
}

export default CreateForm