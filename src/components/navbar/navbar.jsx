import React, {
  Component
} from 'react';
import { connect } from 'react-redux'
import './navbar.css';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    console.log(document.cookie)
  }

  render() {
    return (
      <div onClick={this.handleLogout} className='navbar'>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);