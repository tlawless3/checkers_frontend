import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import {
  composeWithDevTools
} from 'redux-devtools-extension/logOnlyInProduction';
import thunk from 'redux-thunk';
import userReducer from '../reducers/user';

//put reducers into combine reducers func
const rootReducer = combineReducers({
  userReducer
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