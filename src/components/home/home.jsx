import React, {
  Component
} from 'react';
import { connect } from 'react-redux'
import './home.css'
import { Board, Navbar } from '../index'
import Sidebar from './sidebar/sidebar'
import { fetchGamesConditionally, updateAcitveGame, fetchUserGames } from '../../actions/game'
import { setActiveGame } from '../../actions/activeGame'
import { loadState } from '../../localstorage'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
    }

    this.updateBoard = this.updateBoard.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchGamesConditionally()
    const activeGameId = await loadState()
    if (activeGameId && !this.props.gameReducer.isFetching) {
      this.props.setActiveGame(activeGameId.activeGame.id)
    }
    // activeGameId ? this.props.setActiveGame(activeGameId.activeGame.id) : () => null
  }

  async updateBoard(newBoard, jumping, winState) {
    const generateStatus = () => {
      if (jumping && !winState) {
        return this.props.activeGameReducer.activeGame.status
      } else if (winState) {
        return (this.props.activeGameReducer.activeGame.status === 'redTurn' ? 'redWin' : 'blackWin')
      } else {
        return (this.props.activeGameReducer.activeGame.status === 'redTurn' ? 'blackTurn' : 'redTurn')
      }
    }
    const status = generateStatus()
    const requestObj = {
      game: {
        gameId: this.props.activeGameReducer.activeGame.id,
        board: newBoard,
        playerColors: this.props.activeGameReducer.activeGame.playerColors,
        status: status
      }
    }
    await this.props.updateAcitveGame(requestObj)
    await this.props.fetchUserGames()
    await this.props.setActiveGame(this.props.activeGameReducer.activeGame.id)
  }

  render() {
    return (
      <div className='homePageWrapper'>
        <Navbar />
        <div className='activeBoardWrapper'>
          {this.props.activeGameReducer.activeGame ? <Board className='activeBoard' updateBoard={this.updateBoard} board={this.props.activeGameReducer.activeGame.board} activeGame={this.props.activeGameReducer.activeGame} resolution={640} active={true} /> : ''}
        </div>
        {this.props.gameReducer.games ? <Sidebar setActiveGame={this.props.setActiveGame} activeGameId={this.props.activeGameReducer.activeGame ? this.props.activeGameReducer.activeGame.id : null} user={this.props.userReducer.user} games={this.props.gameReducer.games} /> : ''}
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
  updateAcitveGame: (newGameState) => dispatch(updateAcitveGame(newGameState))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);