import {combineReducers} from 'redux'

import GameReducer from './GameReducer'
import AuthReducer from './AuthReducer'
import ErrorReducer from './ErrorReducer'

export default combineReducers({
   Games : GameReducer,
   Error : ErrorReducer,
   Auth : AuthReducer
})


