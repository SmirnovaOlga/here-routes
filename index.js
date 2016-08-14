import 'babel-polyfill';
import angular from 'angular';
import ngRedux from 'ng-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';
import app from './containers/app';
import searchInput from './components/searchInput';
import waypoints from './components/waypoints';
import map from './components/map';
import './css/styles.css';

angular.module('hereMapsExample', [ngRedux])
    .config(($ngReduxProvider) => {
        $ngReduxProvider.createStoreWith(rootReducer, [thunk, createLogger()]);
    })
    .component('hereApp', app())
    .component('hereSearchInput', searchInput())
    .component('hereWaypoints', waypoints())
    .component('hereMap', map());