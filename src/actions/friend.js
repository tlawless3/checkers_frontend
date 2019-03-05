import axios from 'axios'

export const requestFriends = payload => ({
  type: 'REQUEST_FRIENDS',
  payload
})

export const requestRecievedFriends = payload => ({
  type: 'REQUEST_RECIEVED_FRIENDS',
  payload
})

export const requestSentFriends = payload => ({
  type: 'REQUEST_SENT_FRIENDS',
  payload
})

export const fetchAllFriends = () => async (dispatch) => {
  dispatch(requestFriends)
  try {
    const friends = await axios.get(process.env.REACT_APP_SERVER_URL + '/api/v1.0.0/friend/all', {
      withCredentials: true,
    })
    const sentRequests = await axios.get(process.env.REACT_APP_SERVER_URL + '/api/v1.0.0/friend/sent', {
      withCredentials: true,
    })
    const recievedRequests = await axios.get(process.env.REACT_APP_SERVER_URL + '/api/v1.0.0/friend/recieved', {
      withCredentials: true,
    })
    const response = await (Promise.all([friends, sentRequests, recievedRequests]))
    let data = {
      friends: friends.data,
      sentRequests: sentRequests.data,
      recievedRequests: recievedRequests.data
    }
    dispatch({
      type: 'RECIEVE_FRIENDS',
      payload: data
    })
  } catch {
    dispatch({
      type: 'RECIEVE_FRIENDS'
    })
  }
}

export const fetchFriends = () => async (dispatch) => {
  dispatch(requestFriends)
  try {
    const friends = await axios.get(process.env.REACT_APP_SERVER_URL + '/api/v1.0.0/friend/all', {
      withCredentials: true,
    })
    let data = friends.data
    dispatch({
      type: 'RECIEVE_FRIENDS',
      payload: data
    })
  } catch (err) {
    dispatch({
      type: 'RECIEVE_FRIENDS'
    })
  }
}

export const fetchSentRequests = () => async (dispatch) => {
  dispatch(requestSentFriends)
  try {
    const sentRequests = await axios.get(process.env.REACT_APP_SERVER_URL + '/api/v1.0.0/friend/sent', {
      withCredentials: true,
    })
    let data = sentRequests.data
    dispatch({
      type: 'RECIEVE_SENT_REQUESTS',
      payload: data
    })
  } catch (err) {
    dispatch({
      type: 'RECIEVE_SENT_REQUESTS'
    })
  }
}

export const fetchRecievedRequests = () => async (dispatch) => {
  dispatch(requestRecievedFriends)
  try {
    const recievedRequests = await axios.get(process.env.REACT_APP_SERVER_URL + '/api/v1.0.0/friend/recieved', {
      withCredentials: true,
    })
    let data = recievedRequests.data
    dispatch({
      type: 'RECIEVE_RECIEVED_REQUESTS',
      payload: data
    })
  } catch (err) {
    dispatch({
      type: 'RECIEVE_RECIEVED_REQUESTS'
    })
  }
}