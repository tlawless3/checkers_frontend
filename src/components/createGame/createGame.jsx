import React, {
  Component
} from 'react';
import { connect } from 'react-redux'
import './createGame.css';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
    }
  }

  render() {
    return (
      <div className='createGamePageWrapper'>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);