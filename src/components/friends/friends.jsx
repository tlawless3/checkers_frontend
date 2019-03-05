import React, {
  Component
} from 'react';
import {
  Navbar
} from '../index'
import { connect } from 'react-redux'
import axios from 'axios'
import './friends.css'
import { fetchFriends, fetchRecievedRequests, fetchSentRequests } from '../../actions/friend'
import FriendCard from './friendCard/friendCard'
import DeleteFriendModal from './deleteFriendModal/deleteFriendModal'


class Friends extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeFilter: 'all',
      userData: [],
      modal: false,
      friendIdToDelete: ''
    }

    this.isFetching = this.isFetching.bind(this)
    this.fetchAndCreateInfoObj = this.fetchAndCreateInfoObj.bind(this)
    this.createDataArr = this.createDataArr.bind(this)
    this.handleAccept = this.handleAccept.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  isFetching() {
    if (!this.props.friendReducer.isFetchingFriends && !this.props.friendReducer.isFetchingSent && !this.props.friendReducer.isFetchingRecieved) {
      return false
    } else {
      return true
    }
  }

  async createDataArr() {
    const resultArr = []
    console.log('hello')
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
    const userData = await this.fetchAndCreateInfoObj(resultArr)
    this.setState({
      userData
    })
  }

  async fetchAndCreateInfoObj(userArr) {
    const findStatus = (friend) => {
      if (friend.status === 'friends') {
        return 'friends'
      } else {
        const status = (friend.userId === this.props.userReducer.user.userId ? 'sent' : 'recieved')
        return status
      }
    }

    const userObjs = userArr.map(async (friend) => {
      const requestId = (friend.userId === this.props.userReducer.user.userId ? friend.friendId : friend.userId)
      try {
        const userInfo = await axios.post(process.env.REACT_APP_SERVER_URL + '/api/v1.0.0/user/id', { user: { requestId } }, {
          withCredentials: true,
        })
        return ({
          userInfo: { ...userInfo.data, id: requestId },
          status: findStatus(friend)
        })
      } catch (err) {
        console.error(err.message)
      }
    })
    return await Promise.all(userObjs)
  }

  async handleFilterClick(filter) {
    await this.setState({
      activeFilter: filter
    })
    this.createDataArr()
  }

  async handleAccept(friendId) {
    console.log(friendId)
  }

  openModal(friendId) {
    this.setState({
      modal: true,
      friendIdToDelete: friendId
    })
  }

  closeModal() {
    this.setState({
      modal: false,
      friendIdToDelete: ''
    })
  }

  async handleDelete() {
    try {
      await axios.put(process.env.REACT_APP_SERVER_URL + '/api/v1.0.0/friend/deny', { friend: { friendId: this.state.friendIdToDelete } }, {
        withCredentials: true,
      })
    } catch (err) {
      console.error(err.message)
    }

  }

  async componentDidMount() {
    await Promise.all([this.props.fetchFriends(),
    this.props.fetchRecievedRequests(),
    this.props.fetchSentRequests()])
    await this.createDataArr()
  }

  render() {
    console.log(this.state)
    //maybe move isFetching into the page itself and have it render a lodaing screen over a template
    if (this.isFetching()) {
      return (<div>
        loading
      </div>)
    } else {
      return (
        <div className='friendsPageWrapper'>
          <Navbar />
          {this.state.modal ? <DeleteFriendModal handleDelete={this.handleDelete} closeModal={this.closeModal} /> : ''}
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
          {this.state.userData.map(friend => <FriendCard friend={friend} handleAccept={this.handleAccept} openModal={this.openModal} />)}
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