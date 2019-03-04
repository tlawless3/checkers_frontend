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
    console.log(document.cookie)
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
          <div className='logout button'>
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