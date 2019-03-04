import React, {
  Component
} from 'react';
import {
  Navbar
} from '../index'
import { connect } from 'react-redux'
import './friends.css';
import { fetchFriends, fetchRecievedRequests, fetchSentRequests } from '../../actions/friend'

class Friends extends Component {
  constructor(props) {
    super(props)

    this.isFetching = this.isFetching.bind(this)
  }

  isFetching() {
    if (!this.props.friendReducer.isFetchingFriends && !this.props.friendReducer.isFetchingSent && !this.props.friendReducer.isFetchingRecieved) {
      return false
    } else {
      return true
    }
  }

  componentDidMount() {
    this.props.fetchFriends()
    this.props.fetchRecievedRequests()
    this.props.fetchSentRequests()
  }

  render() {
    if (this.isFetching()) {
      return (<div>
        loading
      </div>)
    } else {
      return (
        <div className='friendsPageWrapper'>
          <Navbar />
          Friends
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  fetchFriends: () => dispatch(fetchFriends()),
  fetchRecievedRequests: () => dispatch(fetchRecievedRequests()),
  fetchSentRequests: () => dispatch(fetchSentRequests()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Friends);