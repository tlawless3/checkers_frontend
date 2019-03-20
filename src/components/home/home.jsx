import React, {
  Component
} from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import './home.css'
import { Board, Navbar } from '../index'
import Sidebar from './sidebar/sidebar'
import { fetchGamesConditionally, updateAcitveGame, fetchUserGames } from '../../actions/game'
import { fetchFriends } from '../../actions/friend'
import { setActiveGame } from '../../actions/activeGame'
import { loadState } from '../../localstorage'
import { socket } from '../../index'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      friends: []
    }

    this.updateBoard = this.updateBoard.bind(this)
    this.fetchFriendsData = this.fetchFriendsData.bind(this)
    this.handleAcceptGame = this.handleAcceptGame.bind(this)
    this.handleDeleteGame = this.handleDeleteGame.bind(this)
    this.handleForefitGame = this.handleForefitGame.bind(this)
  }

  async componentDidMount() {
    await this.fetchFriendsData()
    await this.props.fetchGamesConditionally()
    const activeGameId = await loadState()
    if (activeGameId && !this.props.gameReducer.isFetching) {
      this.props.setActiveGame(activeGameId.activeGame.id)
    }
    socket.on('updatedGame', async () => {
      await this.props.fetchUserGames()
      await this.fetchFriendsData()
      const activeGameId = await loadState()
      if (activeGameId && !this.props.gameReducer.isFetching) {
        this.props.setActiveGame(activeGameId.activeGame.id)
      }
    })
  }

  async updateBoard(newBoard, jumping, winState, jumpingPieceCoords) {
    const generateStatus = () => {
      if (jumping && !winState) {
        return this.props.activeGameReducer.activeGame.status
      } else if (winState) {
        return (this.props.activeGameReducer.activeGame.status === 'redTurn' ? 'redWin' : 'blackWin')
      } else {
        return (this.props.activeGameReducer.activeGame.status === 'redTurn' ? 'blackTurn' : 'redTurn')
      }
    }
    const generateJumpingPiece = () => {
      if (jumpingPieceCoords.length > 0) {
        return jumpingPieceCoords
      }
      else return []
    }
    const status = generateStatus()
    const jumpingPiece = generateJumpingPiece()
    const requestObj = {
      game: {
        gameId: this.props.activeGameReducer.activeGame.id,
        board: newBoard,
        playerColors: this.props.activeGameReducer.activeGame.playerColors,
        status: status,
        jumpingPiece: jumpingPiece
      }
    }
    await this.props.updateAcitveGame(requestObj)
    await this.props.fetchUserGames()
    await this.props.setActiveGame(this.props.activeGameReducer.activeGame.id)
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

  async handleDeleteGame(gameId, opponentId) {
    const postObj = {
      game: {
        id: gameId
      },
      opponent: {
        id: opponentId
      }
    }
    await axios.put(process.env.REACT_APP_SERVER_URL + '/api/v1.0.0/game/delete', postObj, {
      withCredentials: true
    })
    await this.props.fetchUserGames()
    if (this.props.activeGameReducer.activeGame.id === gameId) {
      this.props.setActiveGame()
    }
  }

  async handleAcceptGame(gameId) {
    const postObj = {
      game: {
        gameId,
        status: 'blackTurn'
      }
    }
    const response = await axios.put(process.env.REACT_APP_SERVER_URL + '/api/v1.0.0/game/update', postObj, {
      withCredentials: true
    })
    await this.props.fetchUserGames()
  }

  async handleForefitGame(gameId, playerColor) {
    const postObj = {
      game: {
        gameId,
        status: playerColor === 'black' ? 'redWin' : 'blackWin',
      },
    }
    // try {
    await axios.put(process.env.REACT_APP_SERVER_URL + '/api/v1.0.0/game/update', postObj, {
      withCredentials: true
    })
    this.props.fetchUserGames()

  }


  render() {
    return (
      <div className='homePageWrapper'>
        <Navbar />
        <div className='activeBoardWrapper'>
          {this.props.activeGameReducer.activeGame ? <Board className='activeBoard' updateBoard={this.updateBoard} board={this.props.activeGameReducer.activeGame.board} activeGame={this.props.activeGameReducer.activeGame} resolution={640} active={true} /> : ''}
        </div>
        {this.props.gameReducer.games ? <Sidebar handleAcceptGame={this.handleAcceptGame} handleDeleteGame={this.handleDeleteGame} handleForefitGame={this.handleForefitGame} setActiveGame={this.props.setActiveGame} activeGameId={this.props.activeGameReducer.activeGame ? this.props.activeGameReducer.activeGame.id : null} user={this.props.userReducer.user} friends={this.state.friends} games={this.props.gameReducer.games} /> : ''}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  fetchUserGames: () => dispatch(fetchUserGames()),
  fetchGamesConditionally: () => dispatch(fetchGamesConditionally()),
  setActiveGame: (gameId) => dispatch(setActiveGame(gameId)),
  updateAcitveGame: (newGameState) => dispatch(updateAcitveGame(newGameState)),
  fetchFriends: () => dispatch(fetchFriends())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);