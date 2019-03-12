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
      error: false,
    }
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
            <select name="boardSize" onChange={this.handleChange} form="createGameForm">
              <option value="8">8</option>
              <option value="10">10</option>
            </select>
            <select name="color" onChange={this.handleChange} form="createGameForm">
              <option value="red">red</option>
              <option value="black">black</option>
            </select>
            <select name="opponent" onChange={this.handleChange} form="createGameForm">
              <option value="ai">AI</option>
              <option value="friend">friend</option>
            </select>
            {this.state.opponent === 'friend' ? (
              <div>
                <div>
                  Enter a friend's username:
                </div>
                <input onChange={this.handleChange} type='text'></input>
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