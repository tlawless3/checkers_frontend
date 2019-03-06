import React, {
  Component
} from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    const eraseCookie = (name) => {
      document.cookie = name + "=" + "" + "-1" + "; path=/";
    }
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      eraseCookie(cookies[i].split("=")[0]);
    }
    localStorage.clear()
    window.location.reload()
  }

  render() {
    return (
      <div className='navbar'>
        <div className='left'>
          <NavLink to='/home' className='link'>
            <div className='home button'>
              Home
            </div>
          </NavLink>
          <div className='createGame button'>
            Create Game
          </div>
          <NavLink to='/friends' className='link'>
            <div className='friends button'>
              Friends
            </div>
          </NavLink>
        </div>
        <div className='right'>
          <NavLink to='/profile' className='link'>
            <div className='friends button'>
              Profile
            </div>
          </NavLink>
          <div className='logout button' onClick={this.handleLogout}>
            Logout
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);