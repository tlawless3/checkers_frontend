import axios from 'axios'

export const requestUser = payload => ({
  type: 'REQUEST_USER',
  payload
})

// const userLogin = userLogin => {
//   dispatch(requestUserLogin)
//   const user = await axios.get(process.env.REACT_APP_SERVER_URL + '/api/v1.0.0/user/verify', {
//     withCredentials: true
//   })
// }


//these three funcs log user in if there is no user in state and token is valid
export const getUserConditonally = (state) => (dispatch, state) => {
  if (shouldGetUser(state)) {
    return dispatch(getUserByToken(dispatch))
  }
}

const getUserByToken = () => async (dispatch) => {
  dispatch(requestUser())
  const user = await axios.get(process.env.REACT_APP_SERVER_URL + '/api/v1.0.0/user/verify', {
    withCredentials: true
  })
  dispatch({
    type: 'RECIEVE_USER',
    payload: user.data
  })
}

const shouldGetUser = (state) => {
  const user = state.user
  if (!user) {
    return true
  } else if (user.isFetching) {
    return false
  } else {
    return false
  }
}