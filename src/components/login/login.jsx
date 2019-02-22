import React, {
  Component
} from 'react';
import LoginForm from './loginForm/loginForm'
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  loginUser() {

  }

  render() {
    return (
      <div>
        <LoginForm />
      </div>
    )
  }
}

export default Login;