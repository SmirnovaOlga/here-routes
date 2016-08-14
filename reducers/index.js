import { combineReducers } from 'redux';
import searchResults from './searchResults';
import waypoints from './waypoints';

const rootReducer = combineReducers({
    searchResults,
    waypoints
});

export default rootReducer;