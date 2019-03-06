import React, {
  Component
} from 'react';
import { connect } from 'react-redux'
import { Navbar } from '../index'
import './profile.css';

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='profilePageWrapper'>
        <Navbar />
        <div className='profileInfoWrapper'>
          <div className='profileHeader'>
            Your Account:
          </div>
          <div className='usernameProfile'>
            Username: {this.props.userReducer.user.username}
          </div>
          <div className='displayNameProfile'>
            Display Name: {this.props.userReducer.user.displayName}
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);