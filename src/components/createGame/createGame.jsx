import React, {
  Component
} from 'react';
import Navbar from '../navbar/navbar'
import { connect } from 'react-redux'
import './createGame.css';

class CreateGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
    }
  }

  render() {
    return (
      <div className='createGamePageWrapper'>
        <Navbar />
        createGame
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame);