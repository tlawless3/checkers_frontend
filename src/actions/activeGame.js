export const setActiveGame = (gameId) => (dispatch, getState) => {
  const currState = getState()
  console.log('----', currState.gameReducer)
  const game = currState.gameReducer.games.find((element) => {
    return element.id = gameId
  })
  dispatch({
    type: 'SET_ACTIVE_GAME',
    payload: game
  })
}