import h from '../utils/here';

export default function app() {
    return {
        controller: AppController,
        template: require('./app.html')
    };
}

class AppController {

    constructor($ngRedux, $scope) {
        const unsubscribe = $ngRedux.connect(this.mapStateToThis)(this);
        $scope.$on('$destroy', unsubscribe);

        this.dispatch = $ngRedux.dispatch;

        h.initializePlatform();
    }

    // Which part of the Redux global state does our component want to receive?
    mapStateToThis(state) {
        return {
            searchResults: state.searchResults,
            waypoints: state.waypoints
        };
    }
}