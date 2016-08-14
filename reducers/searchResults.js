import { SEARCH_RESULTS_RECEIVE, SEARCH_RESULTS_CLEAR, WAYPOINT_ADD } from '../constants/actionTypes';

export default function searchResults(state = [], action) {
    switch (action.type) {
        case SEARCH_RESULTS_RECEIVE:
            return action.searchResults;
        case SEARCH_RESULTS_CLEAR:
            return [];
        case WAYPOINT_ADD:
            return [];
        default:
            return state;
    }
}