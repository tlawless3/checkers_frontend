import React, {
  Component
} from 'react';
import { connect } from 'react-redux'
import './home.css'
import { Board, Navbar } from '../index'
import Sidebar from './sidebar/sidebar'
import { fetchGamesConditionally } from '../../actions/game'
import { setActiveGame } from '../../actions/activeGame'
import { loadState } from '../../localstorage'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
    }
  }

  componentDidMount() {
    this.props.fetchGamesConditionally().then(() => {
      const activeGameId = loadState()
      !activeGameId || this.props.setActiveGame(activeGameId.activeGame.id)
    })
  }

  componentWillUnmount() {
    this.props.setActiveGame(null)
  }

  render() {
    return (
      <div className='homePageWrapper'>
        <Navbar />
        <div className='activeBoardWrapper'>
          {this.props.activeGameReducer.activeGame ? <Board className='activeBoard' board={this.props.activeGameReducer.activeGame.board} resolution={640} active={true} /> : ''}
        </div>
        {this.props.gameReducer.games ? <Sidebar setActiveGame={this.props.setActiveGame} user={this.props.userReducer.user} games={this.props.gameReducer.games} /> : ''}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  fetchGamesConditionally: () => dispatch(fetchGamesConditionally()),
  setActiveGame: (gameId) => dispatch(setActiveGame(gameId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);