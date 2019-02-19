export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_USER':
      return {
        result: action.payload
      }
    default:
      return state
  }
}