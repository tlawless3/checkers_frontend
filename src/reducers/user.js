export default (state = {}, action) => {
  switch (action.type) {
    case 'REQUEST_USER':
      return {
        ...state,
        isFetching: true
      }
    case 'RECIEVE_USER':
      return {
        ...state,
        user: action.payload,
        isFetching: false
      }
    default:
      return state
  }
}