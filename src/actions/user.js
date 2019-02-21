import axios from 'axios'

export const getUserToken = () => async (dispatch) => {
  const user = await axios.get(process.env.REACT_APP_SERVER_URL + '/api/v1.0.0/user/verify', {
    withCredentials: true
  })
  console.log(user)
  dispatch({
    type: 'GET_USER',
    payload: user.data
  })
}