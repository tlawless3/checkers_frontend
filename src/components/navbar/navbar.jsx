import React, {
  Component
} from 'react';
import { connect } from 'react-redux'
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
      // createCookie(name, "", -1);
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
          <div className='home button'>
            Home
          </div>
          <div className='createGame button'>
            Create Game
          </div>
        </div>
        <div className='right'>
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