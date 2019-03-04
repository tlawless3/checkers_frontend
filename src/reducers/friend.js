export default (state = {}, action) => {
  switch (action.type) {
    case 'REQUEST_FRIENDS':
      return {
        ...state,
        isFetchingFriends: true
      }
    case 'REQUEST_RECIEVED_FRIENDS':
      return {
        ...state,
        isFetchingRecieved: true
      }
    case 'REQUEST_SENT_FRIENDS':
      return {
        ...state,
        isFetchingSent: true
      }
    case 'RECIEVE_FRIENDS':
      return {
        ...state,
        friends: action.payload,
        isFetchingFriends: false
      }
    case 'RECIEVE_RECIEVED_REQUESTS':
      return {
        ...state,
        recievedRequests: action.payload,
        isFetchingRecieved: false
      }
    case 'RECIEVE_SENT_REQUESTS':
      return {
        ...state,
        sentRequests: action.payload,
        isFetchingSent: false
      }
    default:
      return state
  }
}