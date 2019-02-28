export const setActiveGame = (gameId) => async (dispatch, getState) => {
  const currState = await getState()
  let game = null;
  currState.gameReducer.games.forEach((element) => {
    if (element.id === gameId) {
      game = element
    }
  })
  dispatch({
    type: 'SET_ACTIVE_GAME',
    payload: game
  })
}