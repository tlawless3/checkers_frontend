export const setActiveGame = (gameId) => async (dispatch, getState) => {
  const currState = getState()
  let game = currState.gameReducer.games.find((element) => {
    if (element.id === gameId) {
      return true
    }
  })
  dispatch({
    type: 'SET_ACTIVE_GAME',
    payload: game
  })
}