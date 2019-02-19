//action types

export const simpleAction = () => dispatch => {
  dispatch({
    type: 'GET_USER',
    payload: 'result_of_simple_action'
  })
}