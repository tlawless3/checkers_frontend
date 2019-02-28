import React, {
  Component
} from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
    }

    this.generateBoard = this.generateBoard.bind(this)
  }

  generateBoard() {
    const board = [["red", "empty", "red", "empty", "red", "empty", "red", "empty"], ["empty", "red", "empty", "red", "empty", "red", "empty", "red"], ["red", "empty", "red", "empty", "red", "empty", "red", "empty"], ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"], ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"], ["empty", "black", "empty", "black", "empty", "black", "empty", "black"], ["black", "empty", "black", "empty", "black", "empty", "black", "empty"], ["empty", "black", "empty", "black", "empty", "black", "empty", "black"]]
    const resolution = 800
    const rows = board.length
    const ratio = (resolution / rows)

    console.log(ratio)

    const canvas = ReactDOM.findDOMNode(this.refs.boardCanvas)
    const ctx = canvas.getContext('2d')
    canvas.width = resolution
    canvas.height = resolution
    canvas.style.width = resolution + 'px'
    canvas.style.height = resolution + 'px'

    //for loop that generates board rowHeight is y columnWidth is x
    let rowHeight = 0
    for (let i = 0; i < rows; i++) {
      let columnWidth = 0
      for (let j = 0; j < rows; j++) {
        if (i % 2 === 0) {
          if (j % 2 === 0) {
            ctx.rect(columnWidth, rowHeight, ratio, ratio)
            ctx.stroke()
          } else {
            ctx.fillRect(columnWidth, rowHeight, ratio, ratio)
            ctx.stroke()
          }
        } else {
          if (!(j % 2 === 0)) {
            ctx.rect(columnWidth, rowHeight, ratio, ratio)
            ctx.stroke()
          } else {
            ctx.fillRect(columnWidth, rowHeight, ratio, ratio)
            ctx.stroke()
          }
        }
        columnWidth += (ratio)
      }
      columnWidth = 0
      rowHeight += (ratio)
    }
    return canvas
  }

  componentDidMount() {
    this.generateBoard()
  }

  render() {
    return (
      <div className='boardWrapper'>
        <canvas ref='boardCanvas' />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Board);