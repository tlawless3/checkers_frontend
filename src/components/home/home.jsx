import React, {
  Component
} from 'react';
import { Board } from '../index'
import { connect } from 'react-redux'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
    }
  }

  render() {
    return (
      <div className='homePageWrapper'>
        <Board />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);