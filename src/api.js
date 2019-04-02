/* Configure the Twitter API */
var TWITTER_CONSUMER_KEY = '7KiX7dZXPzP1qgrJCUmDm5ywc';
var TWITTER_CONSUMER_SECRET = 'dfwWxsGnOlAUNffCgmaO8f5okKlOFHGsO29NqSUGxG9thSfwIs';
var TWITTER_ACCESS_TOKEN = '254044470-TfQlvdpqDpdv5N9iwbLu5Cl00kWiy0vTJDzM4XFM';
var TWITTER_ACCESS_TOKEN_SECRET = 'djezl3uxt3CDIYz0rstklodnWIB1bmGhBxUPaYCV8Bjn7';

/* Set Twitter search phrase */
var TWITTER_SEARCH_PHRASE = 'modi';

var Twit = require('twit');

var TwiiterClient = new Twit({
    consumer_key: TWITTER_CONSUMER_KEY,
    consumer_secret: TWITTER_CONSUMER_SECRET,
    access_token: TWITTER_ACCESS_TOKEN,
    access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
});

console.log('The twitter client is running...');

/* ClientInit() : To initiate the client */
function ClientInit() {

    function CliInitiated (error, data, response) {
        if (error) {
            console.log('twitter client could not be initiated, : ' + error);
        }
        else {

        }
    }
    fetchTweets(TWITTER_SEARCH_PHRASE);
}

function fetchTweets(keyword) {
    TwiiterClient.get('search/tweets', { q: keyword, count: 4 }, function(err, data, response) {
        console.log(data)
    })
}

/* Initiate the TwiiterClient */
ClientInit();