import axios from 'axios'

export const requestUser = payload => ({
  type: 'REQUEST_USER',
  payload
})

export const userLogin = (userLogin) => async (dispatch) => {
  dispatch(requestUser)
  try {
    const user = await axios.post(process.env.REACT_APP_SERVER_URL + '/api/v1.0.0/user/login', userLogin, {
      withCredentials: true,
    })
    dispatch({
      type: 'RECIEVE_USER',
      payload: user.data
    })
  } catch {
    dispatch({
      type: 'RECIEVE_USER'
    })
  }
}


//these three funcs 'log user in' if there is no user in state and token is valid
export const getUserConditionally = () => (dispatch, getState) => {
  if (shouldGetUser(getState())) {
    return dispatch(getUserByToken(dispatch))
  }
}

const getUserByToken = () => async (dispatch) => {
  dispatch(requestUser)
  try {
    const user = await axios.get(process.env.REACT_APP_SERVER_URL + '/api/v1.0.0/user/verify', {
      withCredentials: true
    })
    dispatch({
      type: 'RECIEVE_USER',
      payload: user.data
    })
  } catch (err) {
    dispatch({
      type: 'RECIEVE_USER'
    })
  }
}

const shouldGetUser = (state) => {
  const user = state.userReducer.user
  if (!user) {
    return true
  } else if (user.isFetching) {
    return false
  } else {
    return false
  }
}