import { searchResultsFetch } from '../actions/searchResults';
import { waypointAdd } from '../actions/waypoints';

export default function searchInput() {
    return {
        controller: SearchInputController,
        template: require('./searchInput.html'),
        bindings: {
            searchResults: '<',
            waypoints: '<',
            dispatch: '<'
        }
    };
}

class SearchInputController {
    triggerSearch(searchValue) {
        this.dispatch(searchResultsFetch(searchValue));
    }
    
    selectSearchResult(index) {
        this.dispatch(waypointAdd(this.searchResults[index]));
    }
}