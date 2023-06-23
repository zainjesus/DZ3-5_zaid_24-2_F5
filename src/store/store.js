import { legacy_createStore as createStore } from 'redux'
import { formReducer } from './formReducer'

export default createStore(formReducer)