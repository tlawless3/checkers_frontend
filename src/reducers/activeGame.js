export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_GAME':
      return {
        ...state,
        activeGame: action.payload
      }
    default:
      return state
  }
}