import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import componentReducer from './reducers/ComponentReducers';

const rootReducer = combineReducers({
    component: componentReducer
});

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
}

export default configureStore;