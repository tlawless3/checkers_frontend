import React, {
  Component
} from 'react';
import { connect } from 'react-redux'
import './home.css'
import { Board } from '../index'
import Sidebar from './sidebar/sidebar'
import { fetchGamesConditionally } from '../../actions/game'
import { setActiveGame } from '../../actions/activeGame'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
    }
  }

  componentDidMount() {
    this.props.fetchGamesConditionally()
  }

  render() {
    return (
      <div className='homePageWrapper'>
        {this.props.activeGameReducer.activeGame ? <Board board={this.props.activeGameReducer.activeGame.board} resolution={640} active={true} /> : ''}
        {this.props.gameReducer.games ? <Sidebar setActiveGame={this.props.setActiveGame} games={this.props.gameReducer.games} /> : ''}
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