export const aiMove = (board, activeGame) => {
  //returns an array of tiles that can jump
  const generateJumps = (colorTurn) => {
    let possibleJumps = []
    //check if there are jumps
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if ((board[i][j].color === colorTurn) || (board[i][j].color === colorTurn)) {
          const jumps = generatePossibleMoves(i, j, true, board, activeGame)
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
  const generateMoves = (colorTurn) => {
    let possibleMoves = []
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if ((board[i][j].color === colorTurn) || (board[i][j].color === colorTurn)) {
          const moves = generatePossibleMoves(i, j, false, board, activeGame)
          if (moves.length > 0) {
            possibleMoves.push({
              tile: [i, j],
              score: 0
            })
          }
        }
      }
    }
    console.log(possibleMoves)
    return possibleMoves
  }

  const determineBestMove = (tileScoreArr, startingColor, depth) => {
    console.log('----', tileScoreArr)
    if (depth <= 7) {
      let moveArr = tileScoreArr.map(tileObj => {
        let moves = generatePossibleMoves(tileObj.tile[0], tileObj.tile[1], true, board, startingColor)
        if (moves) {
          const returnValue = moves.map(move => {
            return {
              tile: move,
              score: tileObj.score++
            }
          })
          return returnValue
        } else {
          moves = generatePossibleMoves(tileObj.tile[0], tileObj.tile[1], false, board, startingColor)
          const returnValue = moves.map(move => {
            return {
              tile: move,
              score: tileObj.score
            }
          })
          return returnValue
        }
      })
      let newColor = (startingColor === 'red' ? 'black' : 'red')
      depth++
      if (moveArr.length === 0) {
        console.log('end')
      } else {
        determineBestMove(moveArr, newColor, depth)
      }
    }
  }
  let possibleJumps = generateJumps(activeGame.status === 'redTurn' ? 'red' : 'black')
  //when there are multipleJumps
  if (possibleJumps.length > 0) {
    return determineBestMove(possibleJumps, activeGame.status === 'redTurn' ? 'red' : 'black', 0)
  }
  //when there is only one jump
  else if (possibleJumps.length === 1) {
    return possibleJumps[0]
  }
  //when there are no jumps
  else {
    let possibleMoves = generateMoves(activeGame.status === 'redTurn' ? 'red' : 'black')
    console.log(possibleMoves)
    return determineBestMove(possibleMoves, activeGame.status === 'redTurn' ? 'red' : 'black', 0)
  }
}

//
//
//
//
//
//copy pasted basically from board.jsx

const generatePossibleMoves = (xCoord, yCoord, jumpsOnly, board, turnColor) => {
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