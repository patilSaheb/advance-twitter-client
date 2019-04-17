import React, { Component } from 'react';
import { TweetBody } from './components/tweet';
import Header from './components/topHeaderMaterialize';
import './App.css';
import faker from 'faker';
import { Facebook } from 'react-content-loader';
// import Dialogue from './components/modal';

const styles = {
  "margin": '1.1rem 0 1.1rem 2rem',
}

const MyFacebookLoader = () => <Facebook style={styles}/>

class App extends Component {
  constructor() {
    super()
    this.state = {
      tweets: [],
      modalContent: null,
      searchQuery: 'images',
      modalIsOpen: false,
      noResults: false
    }

    this.getFeeds = this.getFeeds.bind(this);
    this.setSearchQuery = this.setSearchQuery.bind(this);
    this.modalContent = this.modalContent.bind(this);

    // Binds our scroll event handler
    window.onscroll = () => {
      // Bails early if:
      // * there's an error
      // * it's already loading
      // * there's nothing left to load

      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        this.getFeeds();
      }
    };
  }

  componentDidMount() {
    this.generator().next();
  }

  setSearchQuery(keyword) {
    this.setState({ searchQuery: keyword, tweets: [] }, () => {

      this.generator().next();
    });
  }

  modalContent(content) {
    console.log('modal',content);
    this.setState({modalContent: content},()=>{
      this.setState({modalIsOpen: !this.state.modalIsOpen})
    })
  }

  getFeeds() {
    fetch(`https://twit-be.herokuapp.com/search/${this.state.searchQuery}`)
      .then(feeds => feeds.json())
      .then(data => {
        let stateTweets = this.state.tweets.concat(data.statuses);
        this.setState({
          tweets: stateTweets
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({noResults: !this.state.noResults});
      });
  }

  setLoader() {
    this.setState({ isLoading: !this.state.isLoading })
  }

  unsetLoader() {
    this.setState({ isLoading: false })
  }

  //generator application
  * generator() {
    this.setLoader();
    yield this.getFeeds()
    yield this.unsetLoader();
  }

  render() {
    return (
      <div className="main-body">
        <Header profilePic={faker.internet.avatar()} searchCallback={this.setSearchQuery} />
        <main role="main">
          <div className="container">
            <div className="row">
              <div className="col l2"></div>
              <div className="col l8">
                {[...this.state.tweets].map((user, index) => {
                  let name = user.user.name
                  let username = user.user.screen_name
                  let image = user.user.profile_image_url
                  let tweet = user.text
                  let tweetImg = user.entities.media
                  return (
                    <TweetBody
                      popOut={this.modalContent}
                      key={index}
                      name={name}
                      username={username}
                      tweet={tweet}
                      image={image}
                      postImage={tweetImg}
                    />
                  )
                })}
                <div className="tweet-body">
                <MyFacebookLoader/>
                </div>
              </div>
              <div className="col l2"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
