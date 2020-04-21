import {createStore,compose,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootRed from './reducers'
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly'

const initialState = {}

const middleware = [thunk]

const store = createStore(
    rootRed,
    initialState,
    compose(
        applyMiddleware(...middleware)  
    )
)

export default store
