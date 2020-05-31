import {createStore,compose,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootRed from './reducers'
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly'


const initialState = {}

const middleware = [thunk]

const store = createStore(
    rootRed,
    initialState,
    composeWithDevTools(
        applyMiddleware(...middleware),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

export default store
