export default (state = {}, action) => {
  switch (action.type) {
    case 'REQUEST_GAMES':
      return {
        ...state,
        isFetching: true
      }
    case 'REQUEST_ACTIVE_GAME':
      return {
        ...state,
        isFetchingActiveGame: true
      }
    case 'RECIEVE_ACTIVE_GAME':
      return {
        ...state,
        games: action.payload,
        isFetchingActiveGame: false
      }
    case 'RECIEVE_GAMES':
      return {
        ...state,
        games: action.payload,
        isFetching: false
      }
    default:
      return state
  }
}