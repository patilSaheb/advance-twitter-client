import {
    REQUEST_TWEETS,
    REQUEST_SUCCESS,
    REQUEST_FAILURE,
    UPDATE_SEARCH_QUERY,
    CLEAR_TWEETS,
    NO_RESULTS
} from '../actions/actions';

const initialState = {
    searchKeyword: 'images',
    newTweets: [],
    loading: false,
    error: null,
    isSearchQuery: false,
    noResults: false
}

export default function tweetsReducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_TWEETS:
            return {
                ...state,
                loading: true,
                error: null
            };

        case REQUEST_SUCCESS:
            let latestTweets = null;
            let emptyArray = state.noResults;
            if (state.isSearchQuery) {
                latestTweets = action.payload;
            } else {
                latestTweets = state.newTweets.concat(action.payload);
            }
            emptyArray = latestTweets.length === 0 ? true : false;
            return {
                ...state,
                loading: false,
                newTweets: latestTweets,
                isSearchQuery: false,//this should be set back to false to allow concat on searched queries
                noResults: emptyArray
            };

        case REQUEST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                newTweets: []
            };

        case UPDATE_SEARCH_QUERY:
        let tempArray = state.noResults;
        tempArray = state.newTweets.length === 0 ? true : false;
            return {
                ...state,
                searchKeyword: action.payload,
                isSearchQuery: true,
                noResults: tempArray
            };

        case CLEAR_TWEETS:
            return {
                ...state,
                newTweets: []
            };

        case NO_RESULTS:
            return {
                ...state,
                noResults: !state.noResults
            }    

        default:
            return state;
    }
}
