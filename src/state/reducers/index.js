// import all of your reducers into this file, and export them back out. 
// This allows for the simplification of flow when importing reducers into your actions throughout your app.

// example test imports, etc
import counterReducer from './counter';
import loggedReducer from './isLogged';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    counter : counterReducer,
    isLogged : loggedReducer
})

export default allReducers;