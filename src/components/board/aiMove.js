//pass in null for active color and depth to initialize recursive call
export const aiMove = (board, activeColor, depth, activeGame, moveArr) => {
  if (depth >= 7) {
    return 'end'
  }
  //returns an array of tiles that can jump
  const generateJumps = (colorTurn, passedBoard) => {
    let possibleJumps = []
    //check if there are jumps
    for (let i = 0; i < passedBoard.length; i++) {
      for (let j = 0; j < passedBoard.length; j++) {
        if ((passedBoard[i][j].color === colorTurn) || (passedBoard[i][j].color === colorTurn)) {
          const jumps = generatePossibleMoves(i, j, true, passedBoard, colorTurn)
          if (jumps.length > 0) {
            possibleJumps.push({
              tile: [i, j],
              score: 1
            })
          }
        }
      }
    }
    return possibleJumps
  }
  //returns an array of tiles that can move
  const generateMoves = (colorTurn, passedBoard) => {
    let possibleMoves = []
    for (let i = 0; i < passedBoard.length; i++) {
      for (let j = 0; j < passedBoard.length; j++) {
        if ((passedBoard[i][j].color === colorTurn) || (passedBoard[i][j].color === colorTurn)) {
          const moves = generatePossibleMoves(i, j, false, passedBoard, colorTurn)
          if (moves.length > 0) {
            possibleMoves.push({
              tile: [i, j],
              score: 0
            })
          }
        }
      }
    }
    return possibleMoves
  }

  let boardCopy = board.slice()
  let curDepth = depth
  let curColor = activeColor
  if (!depth) {
    curDepth = 0
  }
  if (!activeColor) {
    curColor = (activeGame.status === 'redTurn' ? 'red' : 'black')
  }
  let jumpTiles = generateJumps(boardCopy, activeColor)
  let moveTiles = generateMoves(boardCopy, activeColor)
  //minimax for all tiles that have a jump
  if (jumpTiles.length === 1) {
    let moves = generatePossibleMoves(jumpTiles[0].tile[0], jumpTiles[0].tile[1], true, board, curColor)
    if (moves.length === 1) {
      return moves[0]
    } else {
      moves.forEach(move => {

      })
    }
  } else if (jumpTiles.length === 0 && moveTiles.length > 0) {

  }
}

//
//
//
//
//
//copy pasted basically from board.jsx

const updateBoard = (xCoord, yCoord, board) => {
  let newBoard =
    return newBoard
}

const generatePossibleMoves = (xCoord, yCoord, jumpsOnly, board, turnColor) => {
  console.log(turnColor)
  // const board = board
  const rows = board.length
  //looking for redTurn blackTurn
  const opposingTeam = turnColor
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