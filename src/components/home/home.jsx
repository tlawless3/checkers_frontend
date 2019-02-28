import React, {
  Component
} from 'react';
import { connect } from 'react-redux'
import './home.css'
import { Board } from '../index'
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
      <div className='homePageWrapper' onClick={() => this.props.setActiveGame()}>
        {this.props.activeGameReducer.activeGame ? <Board /> : ''}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  fetchGamesConditionally: () => dispatch(fetchGamesConditionally()),
  setActiveGame: () => dispatch(setActiveGame())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);