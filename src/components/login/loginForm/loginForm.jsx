import React from 'react';
import './loginForm.css';

const LoginForm = (props) => {
  return (
    <div className='loginFormWrapper'>
      {!props.error || <div className='error'>error logging in</div>}
      <div className='loginHeader'>
        Login:
      </div>
      <form onSubmit={props.handleLogin}>
        <input type='text' name='username' placeholder='username' />
        <input type='password' name='password' placeholder='password' />
        <button type='submit'> Submit </button>
      </form>
    </div>
  )
}

export default LoginForm;