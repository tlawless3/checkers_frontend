import axios from 'axios'

export const requestGames = payload => ({
  type: 'REQUEST_GAMES',
  payload
})

export const requestActiveGame = payload => ({
  type: 'REQUEST_ACTIVE_GAME',
  payload
})

export const fetchUserGames = () => async (dispatch) => {
  dispatch(requestGames)
  try {
    const games = await axios.get(process.env.REACT_APP_SERVER_URL + '/api/v1.0.0/game/user/all', {
      withCredentials: true,
    })
    let data = games.data
    dispatch({
      type: 'RECIEVE_GAMES',
      payload: data
    })
  } catch {
    dispatch({
      type: 'RECIEVE_GAMES'
    })
  }
}

export const fetchGamesConditionally = () => (dispatch, getState) => {
  if (shouldGetGame(getState())) {
    return dispatch(fetchUserGames(dispatch))
  }
}

const shouldGetGame = (state) => {
  const reducer = state.gameReducer
  if (!reducer.games) {
    return true
  } else if (reducer.isFetching) {
    return false
  } else {
    return false
  }
}

export const updateAcitveGame = (newGameState) => async (dispatch, getState) => {
  dispatch(requestActiveGame)
  const currState = await getState()
  try {
    const updatedGame = await axios.put(process.env.REACT_APP_SERVER_URL + '/api/v1.0.0/game/update', newGameState, {
      withCredentials: true,
    })
    const updatedGameArr = currState.gameReducer.games.map(game => {
      if (game.id === updatedGame.id) {
        return updatedGame
      }
      return game
    })
    dispatch({
      type: 'RECIEVE_ACTIVE_GAME',
      payload: updatedGameArr
    })
  } catch (err) {
    dispatch({
      type: 'RECIEVE_ACTIVE_GAME'
    })
  }
}