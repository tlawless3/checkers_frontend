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

    this.handleBoardClick = this.handleBoardClick.bind(this)
  }

  handleBoardClick(event) {
    const canvas = event.target
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log("x: " + x + " y: " + y);
  }

  render() {
    return (
      <div className='homePageWrapper'>
        <Board handleClick={this.handleBoardClick} />
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