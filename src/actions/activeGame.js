export const setActiveGame = (gameId) => (dispatch, getState) => {
  const currState = getState()
  const game = currState.gameReducer.games.find((element) => {
    return element.id = "ee05c578-1d74-45db-acd5-ae2be1f7aad2"
  })
  console.log(game)
  dispatch({
    type: 'SET_ACTIVE_GAME',
    payload: game
  })
}