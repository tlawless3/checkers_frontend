export default (state = {}, action) => {
  switch (action.type) {
    case 'REQUEST_GAMES':
      return {
        ...state,
        isFetching: true
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