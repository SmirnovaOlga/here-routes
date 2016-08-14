const instances = {
    _platform: null,
    _map: null
};

export default {
    initializePlatform: () => {
        instances._platform = new H.service.Platform({
            app_id: 'DemoAppId01082013GAL',
            app_code: 'AJKnXv84fjrb0KIHawS0Tg',
            useCIT: true,
            useHTTPS: true
        });
    },
    initializeMap: (mapContainer) => {
        var defaultLayers = instances._platform.createDefaultLayers();

        //Step 2: initialize a map - this map is centered over Berlin
        var map = new H.Map(mapContainer,
            defaultLayers.normal.map, {
                center: {lat: 52.5160, lng: 13.3779},
                zoom: 13
            });
        
        instances._map = map;

        //Step 3: make the map interactive
        // MapEvents enables the event system
        // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
        var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

        // Create the default UI components
        var ui = H.ui.UI.createDefault(map, defaultLayers);
    },
    rebuildRoutes: (waypoints) => {
        
        if (waypoints.length < 2) {
            instances._map.removeObjects(instances._map.getObjects());
            return;
        }
        
        var routeRequestParams = {
            mode: 'fastest;car',
            representation: 'display',
            routeattributes: 'waypoints,summary,shape,legs',
            maneuverattributes: 'direction,action'
        };
        
        waypoints.forEach((point, index) => {
            routeRequestParams[`waypoint${index}`] = `${point.position[0]},${point.position[1]}`;
        });
        
        instances._map.removeObjects(instances._map.getObjects());

        var router = instances._platform.getRoutingService();
        router.calculateRoute(
            routeRequestParams,
            routerOnSuccess,
            routerOnError
        );

        /**
         * This function will be called once the Routing REST API provides a response
         * @param  {Object} result          A JSONP object representing the calculated route
         *
         * see: http://developer.here.com/rest-apis/documentation/routing/topics/resource-type-calculate-route.html
         */
        function routerOnSuccess(result) {
            var route = result.response.route[0];
            /*
             * The styling of the route response on the map is entirely under the developer's control.
             * A representitive styling can be found the full JS + HTML code of this example
             * in the functions below:
             */
            addRouteShapeToMap(route);
        }

        /**
         * This function will be called if a communication error occurs during the JSON-P request
         * @param  {Object} error  The error message received.
         */
        function routerOnError(error) {
            alert('Ooops!');
        }

        /**
         * Creates a H.map.Polyline from the shape of the route and adds it to the map.
         * @param {Object} route A route as received from the H.service.RoutingService
         */
        function addRouteShapeToMap(route){
            var strip = new H.geo.Strip(),
                routeShape = route.shape,
                polyline;

            routeShape.forEach(function(point) {
                var parts = point.split(',');
                strip.pushLatLngAlt(parts[0], parts[1]);
            });

            polyline = new H.map.Polyline(strip, {
                style: {
                    lineWidth: 4,
                    strokeColor: 'rgba(0, 128, 255, 0.7)'
                }
            });
            var map = instances._map;
            // Add the polyline to the map
            map.addObject(polyline);
            // And zoom to its bounding rectangle
            map.setViewBounds(polyline.getBounds(), true);
        }
    }
};