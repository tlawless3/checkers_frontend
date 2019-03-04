import React, {
  Component
} from 'react';
import {
  Navbar
} from '../index'
import { connect } from 'react-redux'
import './friends.css';
import { fetchGamesConditionally } from '../../actions/game'
import { setActiveGame } from '../../actions/activeGame'
import { loadState } from '../../localstorage'

class Friends extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className='friendsPageWrapper'>
        <Navbar />
        Friends
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

export default connect(mapStateToProps, mapDispatchToProps)(Friends);