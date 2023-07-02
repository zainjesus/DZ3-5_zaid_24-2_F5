import { 
    legacy_createStore as createStore, 
    combineReducers,
    applyMiddleware
} from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import { todosReducer } from './todosReducer';
import { formReducer } from './formReducer';
import { postReducer } from './postReducer';

const rootReducer = combineReducers({
  form: formReducer,
  todos: todosReducer,
  posts: postReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;