import {combineReducers} from 'redux'

import GameReducer from './GameReducer'
import AuthReducer from './AuthReducer'
import ErrorReducer from './ErrorReducer'
import DisplayReducer from './DisplayReducer'
import ResReducer from './ResReducer'

export default combineReducers({
   Games : GameReducer,
   Error : ErrorReducer,
   Auth : AuthReducer,
   Res : ResReducer,
   Display : DisplayReducer
})


