//jumping info is obj that contains jumping bool and if true also contains a jumping piece coords
export const aiMove = (board, activeColor, depth, activeGame, jumpingInfo) => {
  // if (depth >= 7) {
  //   return 'end'
  // }
  //returns an array of tiles that can jump
  const generateJumps = (colorTurn, passedBoard) => {
    let possibleJumps = []
    //check if there are jumps
    for (let i = 0; i < passedBoard.length; i++) {
      for (let j = 0; j < passedBoard.length; j++) {
        if ((passedBoard[i][j].color === colorTurn)) {
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
        if ((passedBoard[i][j].color === colorTurn)) {
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
    console.log('possibleMoves', possibleMoves)
    return possibleMoves
  }

  // let boardCopy = board.slice()
  let tileToMove = null
  let targetTile = null
  let opposingColor = activeColor
  if (!activeColor) {
    opposingColor = (activeGame.status === 'redTurn' ? 'red' : 'black')
  }
  //if there's a piece that's jumping jump tiles will be set to that piece
  let jumpTiles = (jumpingInfo.jumping ? [{
    tile: [jumpingInfo.jumpingTile]
  }] : generateJumps(opposingColor, board))
  let moveTiles = generateMoves(activeColor, board)
  console.log('moveTiles', moveTiles)
  console.log('jumpTiles', jumpTiles)
  if (jumpTiles.length === 1) {
    targetTile = jumpTiles[0].tile
    let moves = generatePossibleMoves(jumpTiles[0].tile[0], jumpTiles[0].tile[1], true, board, opposingColor)
    if (moves.length === 1) {
      tileToMove = moves[0]
    } else {
      tileToMove = moves[Math.floor(Math.random() * moves.length)]
    }
  } else if (jumpTiles.length === 0 && moveTiles.length > 0) {
    targetTile = moveTiles[Math.floor(Math.random() * moveTiles.length)].tile
    let moves = generatePossibleMoves(targetTile[0], targetTile[1], false, board, opposingColor)
    tileToMove = moves[Math.floor(Math.random() * moves.length)]
  } else if (jumpTiles.length > 1) {
    targetTile = jumpTiles[Math.floor(Math.random() * jumpTiles.length)].tile
    let moves = generatePossibleMoves(targetTile[0], targetTile[1], true, board, opposingColor)
    tileToMove = moves[Math.floor(Math.random() * moves.length)]
  }

  console.log(tileToMove)
  let newBoard = board.slice()
  console.log(targetTile)
  //king making logic
  if ((newBoard[tileToMove[0]][tileToMove[1]].color === 'black' && targetTile[1] === 0) || (newBoard[tileToMove[0]][tileToMove[1]].color === 'red' && targetTile[1] === board.length - 1)) {
    newBoard[targetTile[0]][targetTile[1]].king = true
    newBoard[targetTile[0]][targetTile[1]].color = newBoard[tileToMove[0]][tileToMove[1]].color
    newBoard[tileToMove[0]][tileToMove[1]].color = 'empty'
  } else {
    newBoard[targetTile[0]][targetTile[1]].color = newBoard[tileToMove[0]][tileToMove[1]].color
    newBoard[targetTile[0]][targetTile[1]].king = newBoard[tileToMove[0]][tileToMove[1]].king
    newBoard[tileToMove[0]][tileToMove[1]].color = 'empty'
  }
  //capturing logic
  if (Math.abs(targetTile[0] - tileToMove[0]) > 1 && Math.abs(targetTile[1] - tileToMove[1]) > 1) {
    if (targetTile[0] - tileToMove[0] === 2 && targetTile[1] - tileToMove[1] === 2) {
      newBoard[tileToMove[0] + 1][tileToMove[1] + 1].color = 'empty'
    } else if (targetTile[0] - tileToMove[0] === 2 && targetTile[1] - tileToMove[1] === -2) {
      newBoard[tileToMove[0] + 1][tileToMove[1] - 1].color = 'empty'
    } else if (targetTile[0] - tileToMove[0] === -2 && targetTile[1] - tileToMove[1] === 2) {
      newBoard[tileToMove[0] - 1][tileToMove[1] + 1].color = 'empty'
    } else if (targetTile[0] - tileToMove[0] === -2 && targetTile[1] - tileToMove[1] === -2) {
      newBoard[tileToMove[0] - 1][tileToMove[1] - 1].color = 'empty'
    }
    //updateBoard(newBoard, jumping, winState, jumping piece)
    // await this.props.updateBoard(newBoard, true, this.checkWinState(newBoard), [targetTile[0], targetTile[1]])
    return ({
      board: newBoard,
      jumping: true,
      jumpingPiece: targetTile
    })
  } else {
    // await this.props.updateBoard(newBoard, false, false, [])
    return ({
      board: newBoard,
      jumping: false,
      jumpingPiece: null
    })
  }
}

//
//
//
//
//
//copy pasted basically from board.jsx


const generatePossibleMoves = (xCoord, yCoord, jumpsOnly, board, turnColor) => {
  console.log('args', xCoord, yCoord)
  // const board = board
  const rows = board.length
  console.log('rows', rows)
  //looking for redTurn blackTurn
  const opposingTeam = turnColor === 'red' ? 'black' : 'red'
  // const opposingTeam = 'black'
  const x = xCoord
  const y = yCoord
  const king = board[x][y].king
  let availabileTiles = []
  //wow you could do this with a for loop that increments by 2
  //TODO change this to a for loop
  if (opposingTeam === 'red') {
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