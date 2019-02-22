import React from 'react';
import './loginForm.css';

const LoginForm = (props) => {
  return (
    <div className='loginFormWrapper'>
      <form onSubmit={props.handleLogin}>
        <input type='text' name='username' placeholder='username' />
        <input type='text' name='password' placeholder='password' />
        <button type='submit'> Submit </button>
      </form>
    </div>
  )
}

export default LoginForm;