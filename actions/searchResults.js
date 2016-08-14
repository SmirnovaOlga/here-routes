import { SEARCH_RESULTS_FETCH, SEARCH_RESULTS_RECEIVE, SEARCH_RESULTS_CLEAR } from '../constants/actionTypes';

export function clearResults() {
    return {
        type: SEARCH_RESULTS_CLEAR
    };
}

export function searchResultsReceive(searchResults, searchValue) {
    return {
        type: SEARCH_RESULTS_RECEIVE,
        searchResults,
        searchValue
    };
}

export function searchResultsFetch(searchValue) {
    return dispatch => {
        return fetch(`https://places.cit.api.here.com/places/v1/autosuggest?at=52.5160,13.3779&q=${searchValue}&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg&tf=plain`)
            .then(response => response.json())
            .then((data) => {
                if (data.results && data.results.length) {
                    const limitedResults = data.results.slice(0, 10);
                    dispatch(searchResultsReceive(limitedResults, searchValue));
                } else {
                    dispatch(clearResults());
                }
            });
    };
}