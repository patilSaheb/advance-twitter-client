export const REQUEST_TWEETS = 'REQUEST_TWEETS';
export const REQUEST_FAILURE = 'REQUEST_FAILURE';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const UPDATE_SEARCH_QUERY = 'UPDATE_SEARCH_QUERY';
export const CLEAR_TWEETS = 'CLEAR_TWEETS';
export const NO_RESULTS = 'NO_RESULTS';

const fetchTweetsBegin = () => ({
    type: REQUEST_TWEETS
  });
  
const fetchTweetsSuccess = tweets => ({
    type: REQUEST_SUCCESS,
    payload: tweets
});
  
const fetchTweetsFailure = error => ({
    type: REQUEST_FAILURE,
    payload: error
  });

const updateSearchQuery = word => ({
    type: UPDATE_SEARCH_QUERY,
    payload: word
});

const clearAllTweets = () => ({
    type: CLEAR_TWEETS
});

const noResults = () => ({
    type: NO_RESULTS
});

export const fetchTweets = (keyword) => {
    return (dispatch,getState) => {
    dispatch(fetchTweetsBegin());
    fetch(`https://twit-be.herokuapp.com/megasearch/${keyword}`) // Redux Thunk handles these
    .then(res => res.json())
    .then(
      data => dispatch(fetchTweetsSuccess(data.statuses)),
      err => dispatch(fetchTweetsFailure(err))
    );}
};

export const searchTweets = query => {
    return (dispatch, getState) => {
        const beforeQuery = getState().tweets.searchKeyword;
        dispatch(updateSearchQuery(query));
        if(beforeQuery !== getState().tweets.searchKeyword) {
            dispatch(clearAllTweets());
            dispatch(fetchTweets(getState().tweets.searchKeyword));
        }
        console.log('uhka',getState().tweets.newTweets)
        // if(getState().tweets.newTweets.length === 0) {
        //     dispatch(noResults());
        // }else{
        //     dispatch(noResults())
        // }
    }
}

export const clearTweets = () => {
    return dispatch => {
        dispatch(clearAllTweets());
    }
}

export const displayNoResults = () => {
    return (dispatch, getState) => {
        if(getState().tweets.newTweets.length === 0){
            dispatch(noResults());
        }
    }
}