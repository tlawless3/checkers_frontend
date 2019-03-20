import React, {
  Component
} from 'react';
import Navbar from '../navbar/navbar'
import axios from 'axios'
import { connect } from 'react-redux'
import { fetchUserGames } from '../../actions/game'
import { fetchFriends } from '../../actions/friend'
import { setActiveGame } from '../../actions/activeGame'
import './createGame.css';

class CreateGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      boardSize: '8',
      playerColors: 'red',
      opponent: 'AI',
      opponentId: '',
      friends: [],
      error: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFriendChange = this.handleFriendChange.bind(this)
    this.generateList = this.generateList.bind(this)
  }

  validateForm(form) {
    let valid = false
    if ((form.game.playerColors.black.length > 0) && (form.game.playerColors.red.length > 0)) {
      valid = true
    }
    return valid
  }

  async handleSubmit(event) {
    event.preventDefault()
    const generatePlayerColors = () => {
      if (this.state.playerColors === 'red') {
        return ({
          black: this.state.opponent === 'AI' ? 'AI' : this.state.opponentId,
          red: this.props.userReducer.user.userId
        })
      } else if (this.state.playerColors === 'black') {
        return ({
          red: this.state.opponent === 'AI' ? 'AI' : this.state.opponentId,
          black: this.props.userReducer.user.userId
        })
      }
    }

    const generateStatus = () => {
      if (this.state.opponent === 'AI') {
        return 'blackTurn'
      } else if (this.state.opponent === 'friend') {
        if (this.state.playerColors === 'red') {
          return 'waitingBlack'
        } else if (this.state.playerColors === 'black') {
          return 'waitingRed'
        }
      }
    }

    const gameObj = {
      game: {
        boardSize: this.state.boardSize,
        playerColors: generatePlayerColors(),
        status: generateStatus()
      }
    }
    if (this.validateForm(gameObj)) {
      try {
        const returnedGameId = await axios.post(process.env.REACT_APP_SERVER_URL + '/api/v1.0.0/game/create', gameObj, {
          withCredentials: true,
        })
        await this.props.fetchUserGames()
        await this.props.setActiveGame(returnedGameId.data)
        this.props.history.push('/home')
      } catch (err) {
        console.error(err.message)
      }
    } else {
      this.setState({
        error: true
      })
    }
  }

  generateList() {
    return (this.state.friends.map(friend => {
      return (<option key={friend.userInfo.username} value={friend.userInfo.username} />)
    }))
  }

  handleChange(event) {
    const key = event.target.name
    const value = event.target.value
    const stateObj = {}
    stateObj[key] = value
    this.setState(stateObj)
  }

  handleFriendChange(event) {
    const value = event.target.value
    this.setState({
      opponentId: ''
    })
    this.state.friends.map(friend => {
      if (friend.userInfo.username === value) {
        this.setState({
          opponentId: friend.userInfo.friendId
        })
      }
    })
  }

  async fetchProfileData() {
    const userObjs = this.props.friendReducer.friends.map(async (friend) => {
      try {
        const userInfo = await axios.post(process.env.REACT_APP_SERVER_URL + '/api/v1.0.0/user/id', { user: { requestId: friend.friendId } }, {
          withCredentials: true,
        })
        return ({
          userInfo: { ...userInfo.data, friendId: friend.friendId },
        })
      } catch (err) {
        console.error(err.message)
      }
    })
    return await Promise.all(userObjs)
  }

  async fetchFriendsData() {
    await this.props.fetchFriends()
    const friendsData = await this.fetchProfileData()
    this.setState({
      friends: friendsData
    })
  }

  async componentDidMount() {
    await this.fetchFriendsData()
  }

  render() {
    return (
      <div className='createGamePageWrapper'>
        <Navbar />
        <div className='createGameFormWrapper'>
          <form id='createGameForm'>
            {this.state.error ? (
              <div className='errorCreateGame'>
                Error Creating Game
          </div>)
              : ''}
            <div className='createHeader'>
              Board Rows:
            </div>
            <select name="boardSize" onChange={this.handleChange} form="createGameForm">
              <option value="8">8</option>
              <option value="10">10</option>
            </select>
            <div className='createHeader'>
              Choose your side:
            </div>
            <select name="playerColors" onChange={this.handleChange} form="createGameForm">
              <option value="red">red</option>
              <option value="black">black</option>
            </select>
            <div className='createHeader'>
              Select your opponent:
            </div>
            <select name="opponent" onChange={this.handleChange} form="createGameForm">
              <option value="AI">AI</option>
              <option value="friend">Friend</option>
            </select>
            {this.state.opponent === 'friend' ? (
              <div className='usernameInput'>
                <div className='createHeader'>
                  Enter a friend's username:
                </div>
                <input name='opponentUsername' onChange={this.handleFriendChange} type='text' list='friendsList'></input>
                <datalist id='friendsList'>
                  {this.generateList()}
                </datalist>
              </div>
            ) : ''}
            <button type='submit' onClick={this.handleSubmit}> Create Game </button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  fetchFriends: () => dispatch(fetchFriends()),
  setActiveGame: (gameId) => dispatch(setActiveGame(gameId)),
  fetchUserGames: () => dispatch(fetchUserGames())
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame);