import React, {
  Component
} from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import './board.css'

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: false,
      selectedSquare: {}
    }

    this.drawBoard = this.drawBoard.bind(this)
    this.drawPieces = this.drawPieces.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  drawBoard() {
    const board = this.props.board
    const resolution = this.props.resolution
    const rows = board.length
    const ratio = (resolution / rows)

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
        ctx.strokeStyle = '#1b56b7'
        ctx.fillStyle = '#1b56b7'
        if (i % 2 === 0) {
          if (!(j % 2 === 0)) {
            ctx.rect(columnWidth, rowHeight, ratio, ratio)
            ctx.stroke()
          } else {
            ctx.fillRect(columnWidth, rowHeight, ratio, ratio)
            ctx.stroke()
          }
        } else {
          if (j % 2 === 0) {
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

  drawPieces() {
    const canvas = ReactDOM.findDOMNode(this.refs.boardCanvas)
    const ctx = canvas.getContext('2d')

    const board = this.props.board
    const resolution = this.props.resolution
    const rows = board.length
    const ratio = (resolution / rows)
    const padding = (ratio / 10)
    const radius = ((ratio - (padding * 2)) / 2)

    //for loop goes through every square and draws pieces
    let rowHeight = 0
    for (let i = 0; i < rows; i++) {
      let columnWidth = 0
      for (let j = 0; j < rows; j++) {
        if (board[i][j] === "red" || board[i][j] === "black") {
          ctx.beginPath();
          //x, y, radius, starting angle, end angle
          let arcX = (columnWidth + (ratio / 2))
          let arcY = (rowHeight + (ratio / 2))
          ctx.arc(arcX, arcY, radius, 0, 2 * Math.PI)
          //setting fill to red or black
          ctx.fillStyle = board[i][j] === 'red' ? '#c93030' : 'black'
          ctx.fill()
        }
        columnWidth += (ratio)
      }
      columnWidth = 0
      rowHeight += (ratio)
    }
  }

  componentDidMount() {
    this.drawBoard()
    this.drawPieces()
  }

  drawHighlights() {
    const canvas = ReactDOM.findDOMNode(this.refs.boardCanvas)
    const ctx = canvas.getContext('2d')
  }

  checkValidMove() {
  }

  handleClick(event) {
    const board = this.props.board
    const resolution = this.props.resolution
    const rows = board.length
    const ratio = (resolution / rows)

    const canvas = event.target
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const column = (Math.floor(x / ratio))
    const row = (Math.floor(y / ratio))
    const square = board[row][column]
    if (!this.state.selected && (this.props.activeGame.status === 'redTurn' && square === 'red') || (this.props.activeGame.status === 'blackTurn' && square === 'black')) {
      this.setState({
        selectedSquare: { x: column, y: row },
        selected: true
      }, () => {

      })
    } else if (this.state.selected) {
      //check valid move
      //update state accordingly
      this.setState({
        selectedSquare: {},
        selected: false
      })
    }
  }

  render() {
    return (
      <div className='boardWrapper'>
        <canvas onClick={this.props.active ? this.handleClick : () => null} className='board' ref='boardCanvas' />
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