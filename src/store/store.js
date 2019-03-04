import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux'
import {
  composeWithDevTools
} from 'redux-devtools-extension/logOnlyInProduction'
import thunk from 'redux-thunk'
import userReducer from '../reducers/user'
import gameReducer from '../reducers/game'
import activeGameReducer from '../reducers/activeGame'
import friendReducer from '../reducers/friend'

//put reducers into combine reducers func
export const rootReducer = combineReducers({
  userReducer,
  gameReducer,
  activeGameReducer,
  friendReducer
})

export default function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  );
}