import React, {
  Component
} from 'react';
import Navbar from '../navbar/navbar'
import { connect } from 'react-redux'
import { fetchFriends } from '../../actions/friend'
import './createGame.css';

class CreateGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      boardSize: '8',
      playerColor: 'red',
      opponent: 'AI',
      opponentUsername: null,
      error: false
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit() {

  }

  handleChange(event) {
    const key = event.target.name
    const value = event.target.value
    const stateObj = {}
    stateObj[key] = value
    this.setState(stateObj)
  }

  render() {
    return (
      <div className='createGamePageWrapper'>
        <Navbar />
        <div className='createGameFormWrapper'>
          <form id='createGameForm'>
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
            <select name="playerColor" onChange={this.handleChange} form="createGameForm">
              <option value="red">red</option>
              <option value="black">black</option>
            </select>
            <div className='createHeader'>
              Select your opponent:
            </div>
            <select name="opponent" onChange={this.handleChange} form="createGameForm">
              <option value="ai">AI</option>
              <option value="friend">friend</option>
            </select>
            {this.state.opponent === 'friend' ? (
              <div className='usernameInput'>
                <div className='createHeader'>
                  Enter a friend's username:
                </div>
                <input name='opponentUsername' onChange={this.handleChange} type='text' list='friendName'></input>
                <datalist id='friendName'>
                  <option value='test' />
                </datalist>
              </div>
            ) : ''}
            <button type='submit'> Create Game </button>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame);