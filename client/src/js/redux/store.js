import { createStore , combineReducers, compose ,applyMiddleware} from 'redux'
import thunk  from 'redux-thunk'
import  setUser  from './reducers/set-user'
import userFilters from './reducers/user-filters'

const rootReducer = combineReducers({
  setUser,
  userFilters
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))


export default store