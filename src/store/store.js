import { legacy_createStore as createStore, combineReducers } from 'redux'
import { formReducer } from './formReducer'
import { todosReducer } from './todosReducer'

const rootReducer = combineReducers({
    todos: todosReducer,
    form: formReducer
})

export default createStore(rootReducer)