import React, {
  Component
} from 'react';
import { connect } from 'react-redux'
import { userLogin } from '../../actions/user';
import LoginForm from './loginForm/loginForm'
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }

  componentDidMount() {
  }

  handleLogin(event) {
    event.preventDefault()
    const userObj = {
      "user": {
        "username": event.target.username.value,
        "password": event.target.password.value
      }
    }
    this.props.userLogin(userObj)
  }

  render() {
    return (
      <div>
        LOGIN
        <LoginForm handleLogin={this.handleLogin} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  userLogin: (userInfo) => dispatch(userLogin(userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);