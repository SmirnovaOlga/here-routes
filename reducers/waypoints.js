import { WAYPOINT_ADD, WAYPOINT_REMOVE, WAYPOINT_MOVE_UP, WAYPOINT_MOVE_DOWN } from '../constants/actionTypes';

export default function waypoints(state = [], action) {
    switch (action.type) {
        case WAYPOINT_ADD:
            return [
                ...state,
                action.waypoint
            ];
        case WAYPOINT_REMOVE:
            return state.slice(0, state.indexOf(action.waypoint)).concat(state.slice(state.indexOf(action.waypoint) + 1));
        case WAYPOINT_MOVE_UP:
            var index = state.indexOf(action.waypoint);
            
            if (!state[index - 1]) {
                return state;
            }
            
            state[index] = state[index - 1];
            state[index - 1] = action.waypoint;
            return state;
        case WAYPOINT_MOVE_DOWN:
            var index = state.indexOf(action.waypoint);

            if (!state[index + 1]) {
                return state;
            }
            
            state[index] = state[index + 1];
            state[index + 1] = action.waypoint;
            return state;
        default:
            return state;
    }
}