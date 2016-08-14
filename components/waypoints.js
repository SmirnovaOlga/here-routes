import { waypointRemove, waypointMoveUp, waypointMoveDown } from '../actions/waypoints';

export default function waypoint() {
    return {
        controller: WaypointsController,
        template: require('./waypoints.html'),
        bindings: {
            searchResults: '<',
            waypoints: '<',
            dispatch: '<'
        }
    };
}

class WaypointsController {
    waypointRemove(index) {
        this.dispatch(waypointRemove(this.waypoints[index]));
    }

    waypointMoveUp(index) {
        this.dispatch(waypointMoveUp(this.waypoints[index]));
    }

    waypointMoveDown(index) {
        this.dispatch(waypointMoveDown(this.waypoints[index]));
    }
}