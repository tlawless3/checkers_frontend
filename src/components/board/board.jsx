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
      selectedSquare: {},
      availabileTiles: [],
    }

    this.drawBoard = this.drawBoard.bind(this)
    this.drawPieces = this.drawPieces.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.drawHighlights = this.drawHighlights.bind(this)
    this.generatePossibleMoves = this.generatePossibleMoves.bind(this)
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
        if (board[j][i].color === "red" || board[j][i].color === "black") {
          ctx.beginPath();
          //x, y, radius, starting angle, end angle
          let arcX = (columnWidth + (ratio / 2))
          let arcY = (rowHeight + (ratio / 2))
          ctx.arc(arcX, arcY, radius, 0, 2 * Math.PI)
          //setting fill to red or black
          ctx.fillStyle = board[j][i].color === 'red' ? '#c93030' : 'black'
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
    const board = this.props.board
    const resolution = this.props.resolution
    const rows = board.length
    const ratio = (resolution / rows)

    const canvas = ReactDOM.findDOMNode(this.refs.boardCanvas)
    const ctx = canvas.getContext('2d')

    this.state.availabileTiles.map(tile => {
      const drawX = tile[0] * ratio
      const drawY = tile[1] * ratio
      ctx.fillStyle = '#faffe5'
      ctx.fillRect(drawX, drawY, ratio, ratio)
      ctx.stroke()
    })
  }

  generatePossibleMoves() {
    const board = this.props.board
    const rows = board.length
    //looking for redTurn blackTurn
    const opposingTeam = this.props.activeGame.status === 'redTurn' ? 'black' : 'red'
    // const opposingTeam = 'black'
    console.log(board)

    const x = this.state.selectedSquare.x
    const y = this.state.selectedSquare.y
    console.log('hello')
    const king = board[x][y].king
    console.log(board[x][y])
    let availabileTiles = []
    if (opposingTeam === 'black') {
      if (y + 1 < rows && x + 1 < rows && board[x + 1][y + 1].color === 'empty') {
        availabileTiles.push([x + 1, y + 1])
      } else if (y + 2 < rows && x + 2 < rows && board[x + 1][y + 1].color === opposingTeam && board[x + 2][y + 2].color === 'empty') {
        availabileTiles.push([x + 2, y + 2])
      }
      if (y + 1 < rows && x - 1 >= 0 && board[x - 1][y + 1].color === 'empty') {
        availabileTiles.push([x - 1, y + 1])
      } else if (y + 2 < rows && x - 2 >= 0 && board[x - 1][y + 1].color === opposingTeam && board[x - 2][y + 2].color === 'empty') {
        availabileTiles.push([x - 2, y + 2])
      }
      if (king) {
        if (y - 1 >= 0 && x + 1 < rows && board[x + 1][y - 1].color === 'empty') {
          availabileTiles.push([x + 1, y - 1])
        } else if (y - 2 >= 0 && x + 2 < rows && board[x + 1][y - 1].color === opposingTeam && board[x + 2][y - 2].color === 'empty') {
          availabileTiles.push([x + 2, y - 2])
        }
        if (y - 1 >= 0 && x - 1 >= 0 && board[x - 1][y - 1].color === 'empty') {
          availabileTiles.push([x - 1, y - 1])
        } else if (y - 2 >= 0 && x - 2 >= 0 && board[x - 1][y - 1].color === opposingTeam && board[x - 2][y - 2].color === 'empty') {
          availabileTiles.push([x - 2, y - 2])
        }
      }
    } else {
      if (y - 1 >= 0 && x + 1 < rows && board[x + 1][y - 1].color === 'empty') {
        availabileTiles.push([x + 1, y - 1])
      } else if (y - 2 >= 0 && x + 2 < rows && board[x + 1][y - 1].color === opposingTeam && board[x + 2][y - 2].color === 'empty') {
        availabileTiles.push([x + 2, y - 2])
      }
      if (y - 1 >= 0 && x - 1 >= 0 && board[x - 1][y - 1].color === 'empty') {
        availabileTiles.push([x - 1, y - 1])
      } else if (y - 2 >= 0 && x - 2 >= 0 && board[x - 1][y - 1].color === opposingTeam && board[x - 2][y - 2].color === 'empty') {
        availabileTiles.push([x - 2, y - 2])
      }
      if (king) {
        if (y + 1 < rows && x + 1 < rows && board[x + 1][y + 1].color === 'empty') {
          availabileTiles.push([x + 1, y + 1])
        } else if (y + 2 < rows && x + 2 < rows && board[x + 1][y + 1].color === opposingTeam && board[x + 2][y + 2].color === 'empty') {
          availabileTiles.push([x + 2, y + 2])
        }
        if (y + 1 < rows && x - 1 >= 0 && board[x - 1][y + 1].color === 'empty') {
          availabileTiles.push([x - 1, y + 1])
        } else if (y + 2 < rows && x - 2 >= 0 && board[x - 1][y + 1].color === opposingTeam && board[x - 2][y + 2].color === 'empty') {
          availabileTiles.push([x - 2, y + 2])
        }
      }
    }
    console.log(availabileTiles)
    return availabileTiles
  }

  clearAndRedrawBoard() {
    const canvas = ReactDOM.findDOMNode(this.refs.boardCanvas)
    const ctx = canvas.getContext('2d')

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.drawBoard()
    this.drawPieces()
  }

  checkValidMove(x, y) {
    const availabileTiles = this.state.availabileTiles
    for (let i = 0; i < availabileTiles.length; i++) {
      if (availabileTiles[i][0] === x && availabileTiles[i][1] === y) {
        return true
      }
    }
    return false
  }

  async handleClick(event) {
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
    const square = board[column][row]
    // top condition is turn protection enabled
    if (!this.state.selected && ((this.props.activeGame.status === 'redTurn' && square.color === 'red') || (this.props.activeGame.status === 'blackTurn' && square.color === 'black'))) {
      // if (!this.state.selected) {
      this.setState({
        selectedSquare: { x: column, y: row },
        selected: true
      }, () => {
        return (
          this.setState({
            availabileTiles: this.generatePossibleMoves()
          }, () => (
            this.drawHighlights()
          )
          ))
      })
    } else if (this.state.selected) {
      if (this.checkValidMove(column, row)) {
        let newBoard = board.slice()
        newBoard[column][row].color = newBoard[this.state.selectedSquare.x][this.state.selectedSquare.y].color
        newBoard[this.state.selectedSquare.x][this.state.selectedSquare.y].color = 'empty'
        if (Math.abs(column - this.state.selectedSquare.y) > 1 && Math.abs(row - this.state.selectedSquare.x) > 1) {
          if (column - this.state.selectedSquare.x === 2 && row - this.state.selectedSquare.y === 2) {
            newBoard[column + 1][row + 1].color = 'empty'
          } else if (row - this.state.selectedSquare.y === 2 && column - this.state.selectedSquare.x === -2) {
            newBoard[column + 1][row - 1].color = 'empty'
          } else if (row - this.state.selectedSquare.y === -2 && column - this.state.selectedSquare.x === 2) {
            newBoard[column - 1][row + 1].color = 'empty'
          } else if (row - this.state.selectedSquare.x === -2 && column - this.state.selectedSquare.y === -2) {
            newBoard[column - 1][row - 1].color = 'empty'
          }
        }
        await this.props.updateBoard(newBoard)
      }
      this.clearAndRedrawBoard()
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