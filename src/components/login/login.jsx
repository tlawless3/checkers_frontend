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
    this.state = {
      error: false,
    }
    this.handleLogin = this.handleLogin.bind(this)
  }

  async handleLogin(event) {
    event.preventDefault()
    const userObj = {
      "user": {
        "username": event.target.username.value,
        "password": event.target.password.value
      }
    }
    this.props.userLogin(userObj)
    if (!this.props.userReducer.user) {
      this.setState({
        error: true
      })
    }
    else {
      this.setState({
        error: false
      })
    }
  }

  render() {
    return (
      <div className='loginPageWrapper'>
        <div className='checkerWrapper'>
          <img id='circles' src={require('../../assets/overlappingCircles.svg')}></img>
        </div>
        <LoginForm handleLogin={this.handleLogin} error={this.state.error} />
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