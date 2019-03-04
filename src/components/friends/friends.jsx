import React, {
  Component
} from 'react';
import {
  Navbar
} from '../index'
import { connect } from 'react-redux'
import './friends.css';
import { fetchFriends, fetchRecievedRequests, fetchSentRequests } from '../../actions/friend'
import FriendCard from './friendCard/friendCard'


class Friends extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeFilter: 'all',
      currentFriends: []
    }

    this.isFetching = this.isFetching.bind(this)
  }

  isFetching() {
    if (!this.props.friendReducer.isFetchingFriends && !this.props.friendReducer.isFetchingSent && !this.props.friendReducer.isFetchingRecieved) {
      return false
    } else {
      return true
    }
  }

  createDataArr() {
    const resultArr = []
    if (this.state.activeFilter === 'all') {
      this.props.friendReducer.friends.map(friend => {
        resultArr.push(friend)
      })
      this.props.friendReducer.recievedRequests.map(request => {
        resultArr.push(request)
      })
      this.props.friendReducer.sentRequests.map(request => {
        resultArr.push(request)
      })
    } else if (this.state.activeFilter === 'friends') {
      this.props.friendReducer.friends.map(friend => {
        resultArr.push(friend)
      })
    } else if (this.state.activeFilter === 'recieved') {
      this.props.friendReducer.recievedRequests.map(request => {
        resultArr.push(request)
      })
    } else if (this.state.activeFilter === 'sent') {
      this.props.friendReducer.sentRequests.map(request => {
        resultArr.push(request)
      })
    }
    this.setState({
      currentFriends: resultArr
    })
  }

  async handleFilterClick(filter) {
    await this.setState({
      activeFilter: filter
    })
    this.createDataArr()
  }

  async componentDidMount() {
    await Promise.all([this.props.fetchFriends(),
    this.props.fetchRecievedRequests(),
    this.props.fetchSentRequests()])
    this.createDataArr()
  }

  render() {
    //maybe move isFetching into the page itself and have it render a lodaing screen over a template
    if (this.isFetching()) {
      return (<div>
        loading
      </div>)
    } else {
      return (
        <div className='friendsPageWrapper'>
          <Navbar />
          <div className='selectors'>
            <div className={(this.state.activeFilter === 'all') ? 'selector activeFilter' : 'selector'} onClick={() => this.handleFilterClick('all')}>
              All
            </div>
            <div className={(this.state.activeFilter === 'friends') ? 'selector activeFilter' : 'selector'} onClick={() => this.handleFilterClick('friends')}>
              Friends
            </div>
            <div className={(this.state.activeFilter === 'sent') ? 'selector activeFilter' : 'selector'} onClick={() => this.handleFilterClick('sent')}>
              Sent
            </div>
            <div className={(this.state.activeFilter === 'recieved') ? 'selector activeFilter' : 'selector'} onClick={() => this.handleFilterClick('recieved')}>
              Recieved
            </div>
          </div>
          {this.state.currentFriends.map(friend => <FriendCard friend={friend} />)}
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