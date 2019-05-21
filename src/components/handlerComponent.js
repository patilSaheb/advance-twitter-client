import React from 'react';

export const Error = (props) => {
    console.log(props.errMsg.message);
    return (
        <div className="card error">
            <span className="flow-text"><h5>Sorry, there seems to some problem...
            <i className="material-icons iconFix">error</i>
            </h5>
            </span>
            <p>Error: {props.errMsg.message}</p>
        </div>
    );
}

export const NoTweets = () => {
    return (
        <div className="card notweet">
            <span className="flow-text"><h5>We could not find any tweets for today...
        <i className="material-icons iconFix">sentiment_dissatisfied</i>
            </h5>
            </span>
            <p>We suggest you check keyword spelling or try other keywords</p>
        </div>
    );
}