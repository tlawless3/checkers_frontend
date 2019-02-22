export default (state = {}, action) => {
  switch (action.type) {
    case 'REQUEST_USER':
      return {
        isFetching: true
      }
    case 'RECIEVE_USER':
      return {
        user: action.payload,
        isFetching: false
      }
    default:
      return state
  }
}