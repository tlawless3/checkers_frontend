import React, {
  Component
} from 'react'
import { aiMove } from './aiMove'
import ReactDOM from 'react-dom'
import './board.css'

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: false,
      selectedSquare: {},
      availabileTiles: [],
      jumping: false,
      jumpingPiece: []
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
          if (board[j][i].king) {
            ctx.fillStyle = (board[j][i].color === 'red' ? 'black' : '#c93030')
            const fontStyleStr = radius + 'px Georgia'
            ctx.font = fontStyleStr;
            ctx.fillText("K", arcX - (radius / 3), arcY + (radius / 3));
          }
        }
        columnWidth += (ratio)
      }
      columnWidth = 0
      rowHeight += (ratio)
    }
  }

  componentDidMount() {
    this.clearAndRedrawBoard()
    if (this.props.activeGame && this.props.activeGame.jumpingPiece.length > 0) {
      console.log('hitting')
      this.setState({
        jumping: true,
        jumpingPiece: this.props.activeGame.jumpingPiece
      })
    } else {
      this.setState({
        jumping: false,
        jumpingPiece: []
      })
    }
  }

  componentDidUpdate() {
    this.clearAndRedrawBoard()
  }

  drawHighlights() {
    const board = this.props.board
    const resolution = this.props.resolution
    const rows = board.length
    const ratio = (resolution / rows)

    const canvas = ReactDOM.findDOMNode(this.refs.boardCanvas)
    const ctx = canvas.getContext('2d')

    this.state.availabileTiles.forEach(tile => {
      const drawX = tile[0] * ratio
      const drawY = tile[1] * ratio
      ctx.fillStyle = '#faffe5'
      ctx.fillRect(drawX, drawY, ratio, ratio)
      ctx.stroke()
    })
  }

  generatePossibleMoves(xCoord, yCoord, jumpsOnly) {
    const board = this.props.board
    const rows = board.length
    //looking for redTurn blackTurn
    const opposingTeam = this.props.activeGame.status === 'redTurn' ? 'black' : 'red'
    // const opposingTeam = 'black'
    const x = xCoord
    const y = yCoord
    const king = board[x][y].king
    let availabileTiles = []
    //wow you could do this with a for loop that increments by 2
    //TODO change this to a for loop
    if (opposingTeam === 'black') {
      if (y + 1 < rows && x + 1 < rows && board[x + 1][y + 1].color === 'empty' && !jumpsOnly) {
        availabileTiles.push([x + 1, y + 1])
      } else if (y + 2 < rows && x + 2 < rows && board[x + 1][y + 1].color === opposingTeam && board[x + 2][y + 2].color === 'empty') {
        availabileTiles.push([x + 2, y + 2])
      }
      if (y + 1 < rows && x - 1 >= 0 && board[x - 1][y + 1].color === 'empty' && !jumpsOnly) {
        availabileTiles.push([x - 1, y + 1])
      } else if (y + 2 < rows && x - 2 >= 0 && board[x - 1][y + 1].color === opposingTeam && board[x - 2][y + 2].color === 'empty') {
        availabileTiles.push([x - 2, y + 2])
      }
      if (king) {
        if (y - 1 >= 0 && x + 1 < rows && board[x + 1][y - 1].color === 'empty' && !jumpsOnly) {
          availabileTiles.push([x + 1, y - 1])
        } else if (y - 2 >= 0 && x + 2 < rows && board[x + 1][y - 1].color === opposingTeam && board[x + 2][y - 2].color === 'empty') {
          availabileTiles.push([x + 2, y - 2])
        }
        if (y - 1 >= 0 && x - 1 >= 0 && board[x - 1][y - 1].color === 'empty' && !jumpsOnly) {
          availabileTiles.push([x - 1, y - 1])
        } else if (y - 2 >= 0 && x - 2 >= 0 && board[x - 1][y - 1].color === opposingTeam && board[x - 2][y - 2].color === 'empty') {
          availabileTiles.push([x - 2, y - 2])
        }
      }
    } else {
      if (y - 1 >= 0 && x + 1 < rows && board[x + 1][y - 1].color === 'empty' && !jumpsOnly) {
        availabileTiles.push([x + 1, y - 1])
      } else if (y - 2 >= 0 && x + 2 < rows && board[x + 1][y - 1].color === opposingTeam && board[x + 2][y - 2].color === 'empty') {
        availabileTiles.push([x + 2, y - 2])
      }
      if (y - 1 >= 0 && x - 1 >= 0 && board[x - 1][y - 1].color === 'empty' && !jumpsOnly) {
        availabileTiles.push([x - 1, y - 1])
      } else if (y - 2 >= 0 && x - 2 >= 0 && board[x - 1][y - 1].color === opposingTeam && board[x - 2][y - 2].color === 'empty') {
        availabileTiles.push([x - 2, y - 2])
      }
      if (king) {
        if (y + 1 < rows && x + 1 < rows && board[x + 1][y + 1].color === 'empty' && !jumpsOnly) {
          availabileTiles.push([x + 1, y + 1])
        } else if (y + 2 < rows && x + 2 < rows && board[x + 1][y + 1].color === opposingTeam && board[x + 2][y + 2].color === 'empty') {
          availabileTiles.push([x + 2, y + 2])
        }
        if (y + 1 < rows && x - 1 >= 0 && board[x - 1][y + 1].color === 'empty' && !jumpsOnly) {
          availabileTiles.push([x - 1, y + 1])
        } else if (y + 2 < rows && x - 2 >= 0 && board[x - 1][y + 1].color === opposingTeam && board[x - 2][y + 2].color === 'empty') {
          availabileTiles.push([x - 2, y + 2])
        }
      }
    }
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

  checkWinState(board) {
    let redRemaining = false
    let blackRemaining = false
    board.map(row => {
      row.map(square => {
        if (square.color === 'red') {
          redRemaining = true
        } else if (square.color === 'black') {
          blackRemaining = true
        }
      })
    })
    if (!blackRemaining || !redRemaining) {
      return true
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

    aiMove(board, this.props.activeGame)

    const checkCoordsForJump = (xCoord, yCoord, jumpArr) => {
      let result = false
      jumpArr.map(jump => {
        if (jump.includes(xCoord) && jump.includes(yCoord)) {
          result = true
        }
      })
      return result
    }

    const checkJumpingPiece = (xCoord, yCoord) => {
      let result = false
      if (this.state.jumpingPiece[0] == xCoord && this.state.jumpingPiece[1] == yCoord) {
        result = true
      }
      return result
    }

    let possibleJumps = []
    //check if there are jumps
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if ((board[i][j].color === 'red' && this.props.activeGame.status === 'redTurn') || (board[i][j].color === 'black' && this.props.activeGame.status === 'blackTurn')) {
          const jumps = this.generatePossibleMoves(i, j, true)
          if (jumps.length > 0) {
            possibleJumps.push([i, j])
          }
        }
      }
    }


    //just seperated logic of when there are jumps/when there aren't could do them together at later date right now there's a lot of code
    //When there are no jumps
    //
    //
    //
    //
    if (possibleJumps.length === 0 && this.state.jumping === false) {
      // turn protection, need to enable player id tied to color protection
      if (!this.state.selected && ((this.props.activeGame.status === 'redTurn' && square.color === 'red') || (this.props.activeGame.status === 'blackTurn' && square.color === 'black'))) {
        this.setState({
          selectedSquare: { x: column, y: row },
          selected: true
        }, () => {
          return (
            this.setState({
              availabileTiles: this.generatePossibleMoves(column, row, false)
            }, () => (
              this.drawHighlights()
            )
            ))
        })
      } else if (this.state.selected) {
        if (this.checkValidMove(column, row)) {
          let newBoard = board.slice()
          //king making logic
          if ((newBoard[this.state.selectedSquare.x][this.state.selectedSquare.y].color === 'black' && row === 0) || (newBoard[this.state.selectedSquare.x][this.state.selectedSquare.y].color === 'red' && row === rows - 1)) {
            newBoard[column][row].king = true
            newBoard[column][row].color = newBoard[this.state.selectedSquare.x][this.state.selectedSquare.y].color
            newBoard[this.state.selectedSquare.x][this.state.selectedSquare.y].color = 'empty'
          } else {
            newBoard[column][row].color = newBoard[this.state.selectedSquare.x][this.state.selectedSquare.y].color
            newBoard[column][row].king = newBoard[this.state.selectedSquare.x][this.state.selectedSquare.y].king
            newBoard[this.state.selectedSquare.x][this.state.selectedSquare.y].color = 'empty'
          }
          //capturing logic
          if (Math.abs(column - this.state.selectedSquare.x) > 1 && Math.abs(row - this.state.selectedSquare.y) > 1) {
            if (column - this.state.selectedSquare.x === 2 && row - this.state.selectedSquare.y === 2) {
              newBoard[this.state.selectedSquare.x + 1][this.state.selectedSquare.y + 1].color = 'empty'
            } else if (column - this.state.selectedSquare.x === 2 && row - this.state.selectedSquare.y === -2) {
              newBoard[this.state.selectedSquare.x + 1][this.state.selectedSquare.y - 1].color = 'empty'
            } else if (column - this.state.selectedSquare.x === -2 && row - this.state.selectedSquare.y === 2) {
              newBoard[this.state.selectedSquare.x - 1][this.state.selectedSquare.y + 1].color = 'empty'
            } else if (column - this.state.selectedSquare.x === -2 && row - this.state.selectedSquare.y === -2) {
              newBoard[this.state.selectedSquare.x - 1][this.state.selectedSquare.y - 1].color = 'empty'
            }
            //updateBoard(newBoard, jumping, winState,)
            await this.props.updateBoard(newBoard, true, this.checkWinState(newBoard), [column, row])
          } else {
            await this.props.updateBoard(newBoard, false, false, [])
          }
        }
        this.setState({
          selected: false,
          selectedSquare: {},
          availabileTiles: []
        })
      }
    }
    //turn when jumping
    //
    //
    //
    //
    //
    else if (possibleJumps.length > 0 && !this.state.jumping) {
      if (!this.state.selected && ((this.props.activeGame.status === 'redTurn' && square.color === 'red') || (this.props.activeGame.status === 'blackTurn' && square.color === 'black')) && checkCoordsForJump(column, row, possibleJumps)) {
        this.setState({
          selectedSquare: { x: column, y: row },
          selected: true
        }, () => {
          return (
            this.setState({
              //this might be the only thing that changes
              availabileTiles: this.generatePossibleMoves(this.state.selectedSquare.x, this.state.selectedSquare.y, true)
            }, () => (
              this.drawHighlights()
            )
            ))
        })
      } else if (this.state.selected) {
        if (this.checkValidMove(column, row)) {
          let newBoard = board.slice()
          //king making logic
          if ((newBoard[this.state.selectedSquare.x][this.state.selectedSquare.y].color === 'black' && row === 0) || (newBoard[this.state.selectedSquare.x][this.state.selectedSquare.y].color === 'red' && row === rows - 1)) {
            newBoard[column][row].king = true
            newBoard[column][row].color = newBoard[this.state.selectedSquare.x][this.state.selectedSquare.y].color
            newBoard[this.state.selectedSquare.x][this.state.selectedSquare.y].color = 'empty'
          } else {
            newBoard[column][row].color = newBoard[this.state.selectedSquare.x][this.state.selectedSquare.y].color
            newBoard[column][row].king = newBoard[this.state.selectedSquare.x][this.state.selectedSquare.y].king
            newBoard[this.state.selectedSquare.x][this.state.selectedSquare.y].color = 'empty'
          }
          //capturing logic
          if (Math.abs(column - this.state.selectedSquare.x) > 1 && Math.abs(row - this.state.selectedSquare.y) > 1) {
            if (column - this.state.selectedSquare.x === 2 && row - this.state.selectedSquare.y === 2) {
              newBoard[this.state.selectedSquare.x + 1][this.state.selectedSquare.y + 1].color = 'empty'
            } else if (column - this.state.selectedSquare.x === 2 && row - this.state.selectedSquare.y === -2) {
              newBoard[this.state.selectedSquare.x + 1][this.state.selectedSquare.y - 1].color = 'empty'
            } else if (column - this.state.selectedSquare.x === -2 && row - this.state.selectedSquare.y === 2) {
              newBoard[this.state.selectedSquare.x - 1][this.state.selectedSquare.y + 1].color = 'empty'
            } else if (column - this.state.selectedSquare.x === -2 && row - this.state.selectedSquare.y === -2) {
              newBoard[this.state.selectedSquare.x - 1][this.state.selectedSquare.y - 1].color = 'empty'
            }
          }
          //removed because we will always be jumping i think
          // else {
          //   await this.props.updateBoard(newBoard, false, false)
          // }

          //updateBoard(newBoard, jumping, winState)

          let newPossibleJumps = this.generatePossibleMoves(column, row, true)

          if (newPossibleJumps.length === 0) {
            await this.props.updateBoard(newBoard, false, this.checkWinState(newBoard), [])
            this.setState({
              // selected: false,
              // selectedSquare: {},
              // availabileTiles: [],
              jumping: false,
              jumpingPiece: []
            })
          } else {
            await this.props.updateBoard(newBoard, true, this.checkWinState(newBoard), [column, row])
            this.setState({
              // selected: false,
              // selectedSquare: {},
              // availabileTiles: [],
              jumping: true,
              jumpingPiece: [column, row]
            })
          }
        }
        this.setState({
          selected: false,
          selectedSquare: {},
          availabileTiles: []
        })
      }
    }
    //turn when already jumped
    //
    //
    //
    //
    //
    //
    else if (possibleJumps.length >= 0 && this.state.jumping) {
      if (!this.state.selected && ((this.props.activeGame.status === 'redTurn' && square.color === 'red') || (this.props.activeGame.status === 'blackTurn' && square.color === 'black')) && checkJumpingPiece(column, row)) {
        this.setState({
          selectedSquare: { x: column, y: row },
          selected: true
        }, () => {
          return (
            this.setState({
              //this might be the only thing that changes
              availabileTiles: this.generatePossibleMoves(this.state.selectedSquare.x, this.state.selectedSquare.y, true)
            }, () => (
              this.drawHighlights()
            )
            ))
        })
      } else if (this.state.selected) {
        let newBoard = board.slice()
        if (this.checkValidMove(column, row)) {
          //king making logic
          if ((newBoard[this.state.selectedSquare.x][this.state.selectedSquare.y].color === 'black' && row === 0) || (newBoard[this.state.selectedSquare.x][this.state.selectedSquare.y].color === 'red' && row === rows - 1)) {
            newBoard[column][row].king = true
            newBoard[column][row].color = newBoard[this.state.selectedSquare.x][this.state.selectedSquare.y].color
            newBoard[this.state.selectedSquare.x][this.state.selectedSquare.y].color = 'empty'
          } else {
            newBoard[column][row].color = newBoard[this.state.selectedSquare.x][this.state.selectedSquare.y].color
            newBoard[column][row].king = newBoard[this.state.selectedSquare.x][this.state.selectedSquare.y].king
            newBoard[this.state.selectedSquare.x][this.state.selectedSquare.y].color = 'empty'
          }
          //capturing logic
          if (Math.abs(column - this.state.selectedSquare.x) > 1 && Math.abs(row - this.state.selectedSquare.y) > 1) {
            if (column - this.state.selectedSquare.x === 2 && row - this.state.selectedSquare.y === 2) {
              newBoard[this.state.selectedSquare.x + 1][this.state.selectedSquare.y + 1].color = 'empty'
            } else if (column - this.state.selectedSquare.x === 2 && row - this.state.selectedSquare.y === -2) {
              newBoard[this.state.selectedSquare.x + 1][this.state.selectedSquare.y - 1].color = 'empty'
            } else if (column - this.state.selectedSquare.x === -2 && row - this.state.selectedSquare.y === 2) {
              newBoard[this.state.selectedSquare.x - 1][this.state.selectedSquare.y + 1].color = 'empty'
            } else if (column - this.state.selectedSquare.x === -2 && row - this.state.selectedSquare.y === -2) {
              newBoard[this.state.selectedSquare.x - 1][this.state.selectedSquare.y - 1].color = 'empty'
            }
          }
          let newPossibleJumps = this.generatePossibleMoves(column, row, true)

          if (newPossibleJumps.length === 0) {
            await this.props.updateBoard(newBoard, false, this.checkWinState(newBoard), [])
            this.setState({
              // selected: false,
              // selectedSquare: {},
              // availabileTiles: [],
              jumping: false,
              jumpingPiece: []
            })
          } else {
            await this.props.updateBoard(newBoard, true, this.checkWinState(newBoard), [column, row])
            this.setState({
              // selected: false,
              // selectedSquare: {},
              // availabileTiles: [],
              jumping: true,
              jumpingPiece: [column, row]
            })
          }

          //updateBoard(newBoard, jumping, winState)
          // await this.props.updateBoard(newBoard, true, this.checkWinState(newBoard))

        }
        this.setState({
          selected: false,
          selectedSquare: {},
          availabileTiles: []
        })
      }
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



export default (Board);