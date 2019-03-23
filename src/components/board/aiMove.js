//jumping info is obj that contains jumping bool and if true also contains a jumping piece coords
export const aiMove = (board, activeColor, jumpingInfo) => {
  // if (depth >= 7) {
  //   return 'end'
  // }
  let tileToMove = null
  let targetTile = null
  //if there's a piece that's jumping jump tiles will be set to that piece
  let jumpTiles = (jumpingInfo.jumping ? [{
    tile: [jumpingInfo.jumpingTile]
  }] : generateJumps(activeColor, board))
  console.log('jumpTiles', jumpTiles)
  console.log(generateMoves)
  let moveTiles = generateMoves(activeColor, board)
  console.log('moveTiles', moveTiles)
  if (jumpTiles.length === 1) {
    targetTile = jumpTiles[0]
    let moves = generatePossibleMovesCopy(jumpTiles[0][0], jumpTiles[0][1], true, board, activeColor)
    if (moves.length === 1) {
      tileToMove = moves[0]
    } else {
      tileToMove = moves[Math.floor(Math.random() * moves.length)]
    }
  } else if (jumpTiles.length === 0 && moveTiles.length > 0) {
    targetTile = moveTiles[Math.floor(Math.random() * moveTiles.length)]
    let moves = generatePossibleMovesCopy(targetTile[0], targetTile[1], false, board, activeColor)
    tileToMove = moves[Math.floor(Math.random() * moves.length)]
  } else if (jumpTiles.length > 1) {
    targetTile = jumpTiles[Math.floor(Math.random() * jumpTiles.length)]
    let moves = generatePossibleMovesCopy(targetTile[0], targetTile[1], true, board, activeColor)
    tileToMove = moves[Math.floor(Math.random() * moves.length)]
  }

  let newBoard = board.slice()
  console.log('tileToMove', tileToMove)
  console.log('targetTile', targetTile)
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
    return ({
      board: newBoard,
      jumping: true,
      jumpingPiece: targetTile
    })
  } else {
    return ({
      board: newBoard,
      jumping: false,
      jumpingPiece: null
    })
  }
}

//returns an array of tiles that can move
const generateMoves = (colorTurn, passedBoard) => {
  let possibleMoves = []
  for (let i = 0; i < passedBoard.length; i++) {
    for (let j = 0; j < passedBoard.length; j++) {
      if ((passedBoard[i][j].color === colorTurn)) {
        console.log('moveFuncTile', passedBoard[i][j])
        const moves = generatePossibleMovesCopy(i, j, false, passedBoard, colorTurn)
        if (moves.length >= 1) {
          possibleMoves.push([i, j])
        }
      }
    }
  }
  return possibleMoves
}

//returns an array of tiles that can jump
const generateJumps = (colorTurn, passedBoard) => {
  let possibleJumps = []
  //check if there are jumps
  for (let i = 0; i < passedBoard.length; i++) {
    for (let j = 0; j < passedBoard.length; j++) {
      if ((passedBoard[i][j].color === colorTurn)) {
        const jumps = generatePossibleMovesCopy(i, j, true, passedBoard, colorTurn)
        console.log('jumps', jumps)
        if (jumps.length >= 1) {
          possibleJumps.push([i, j])
        }
      }
    }
  }
  return possibleJumps
}

//
//
//
//
//
//copy pasted basically from board.jsx


const generatePossibleMovesCopy = (xCoord, yCoord, jumpsOnly, boardToCopy, turnColor) => {
  console.log(boardToCopy)
  console.log(boardToCopy[xCoord][yCoord])
  const board = boardToCopy.slice()
  const rows = board.length
  //looking for redTurn blackTurn
  const opposingTeam = (turnColor === 'red' ? 'black' : 'red')
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