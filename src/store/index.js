import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import dnd from './reducers/dndReducer'
import content from './reducers/contentReducer'

const rootReducer = combineReducers(dnd, content)
const store = createStore(rootReducer)

export default store
