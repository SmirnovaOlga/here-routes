import { WAYPOINT_ADD, WAYPOINT_REMOVE, WAYPOINT_MOVE_UP, WAYPOINT_MOVE_DOWN } from '../constants/actionTypes';
import h from '../utils/here';

export function waypointAdd(waypoint) {
    return (dispatch, getState) => {
        dispatch({
            type: WAYPOINT_ADD,
            waypoint 
        });
        h.rebuildRoutes(getState().waypoints);
    };
}

export function waypointRemove(waypoint) {
    return (dispatch, getState) => {
        dispatch({
            type: WAYPOINT_REMOVE,
            waypoint
        });
        h.rebuildRoutes(getState().waypoints);
    };
}

export function waypointMoveUp(waypoint) {
    return (dispatch, getState) => {
        dispatch({
            type: WAYPOINT_MOVE_UP,
            waypoint
        });
        h.rebuildRoutes(getState().waypoints);
    };
}

export function waypointMoveDown(waypoint) {
    return (dispatch, getState) => {
        dispatch({
            type: WAYPOINT_MOVE_DOWN,
            waypoint
        });
        h.rebuildRoutes(getState().waypoints);
    };
}
