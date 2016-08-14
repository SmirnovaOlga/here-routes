import h from '../utils/here';

export default function map() {
    return {
        controller: MapController,
        template: require('./map.html'),
        bindings: {
            waypoints: '<',
            dispatch: '<'
        }
    };
}

class MapController {
    constructor() {
        var mapContainer = document.querySelector('.map__container');

        h.initializeMap(mapContainer);
    }
}