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
import AddFriendModal from './addFriendModal/addFriendModal'


class Friends extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeFilter: 'all',
      userData: [],
      deleteModal: false,
      addModal: false,
      friendIdToDelete: '',
      firendUsernameToAdd: '',
      addError: false
    }

    this.isFetching = this.isFetching.bind(this)
    this.fetchAndCreateInfoObj = this.fetchAndCreateInfoObj.bind(this)
    this.createDataArr = this.createDataArr.bind(this)
    this.handleAccept = this.handleAccept.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
    this.closeDeleteModal = this.closeDeleteModal.bind(this)
    this.openAddModal = this.openAddModal.bind(this)
    this.closeAddModal = this.closeAddModal.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
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
    try {
      const result = await axios.put(process.env.REACT_APP_SERVER_URL + '/api/v1.0.0/friend/accept', { friend: { friendId } }, {
        withCredentials: true,
      })
    } catch (err) {
      console.error(err.message)
    }
    this.fetchFriends()
  }

  async handleAdd(event) {
    event.preventDefault()

    const checkUsernameAvailable = async (username) => {
      let available = await axios.post(process.env.REACT_APP_SERVER_URL + '/api/v1.0.0/user/available', { user: { username } }, {
        withCredentials: true,
      })
      return available.data.available
    }
    try {
      const username = this.state.firendUsernameToAdd
      const exists = ! await checkUsernameAvailable(username)
      if (exists) {
        this.setState({
          addError: false
        })
        await axios.post(process.env.REACT_APP_SERVER_URL + '/api/v1.0.0/friend/request', { friend: { username } }, {
          withCredentials: true,
        })
        this.closeAddModal()
      } else {
        this.setState({
          addError: true
        })
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  handleUsernameChange(event) {
    this.setState({
      firendUsernameToAdd: event.target.value
    })
  }

  openDeleteModal(friendId) {
    this.setState({
      deleteModal: true,
      friendIdToDelete: friendId
    })
  }

  closeDeleteModal() {
    this.setState({
      deleteModal: false,
      friendIdToDelete: ''
    })
  }

  openAddModal() {
    this.setState({
      addModal: true
    })
  }

  closeAddModal() {
    this.setState({
      addModal: false,
      addError: false
    })
  }

  async handleDelete() {
    try {
      const result = await axios.put(process.env.REACT_APP_SERVER_URL + '/api/v1.0.0/friend/deny', { friend: { friendId: this.state.friendIdToDelete } }, {
        withCredentials: true,
      })
    } catch (err) {
      console.error(err.message)
    }
    this.fetchFriends()
  }

  async fetchFriends() {
    await Promise.all([this.props.fetchFriends(),
    this.props.fetchRecievedRequests(),
    this.props.fetchSentRequests()])
    await this.createDataArr()
  }

  async componentDidMount() {
    this.fetchFriends()
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
          {this.state.deleteModal ? <DeleteFriendModal handleDelete={this.handleDelete} closeDeleteModal={this.closeDeleteModal} /> : ''}
          {this.state.addModal ? <AddFriendModal addError={this.state.addError} handleUsernameChange={this.handleUsernameChange} closeAddModal={this.closeAddModal} handleAdd={this.handleAdd} /> : ''}
          <div className='addModalButton' onClick={this.openAddModal}>Add Friend</div>
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
          <div className='cards'>
            {this.state.userData.map(friend => <FriendCard friend={friend} handleAccept={this.handleAccept} openDeleteModal={this.openDeleteModal} />)}
          </div>
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