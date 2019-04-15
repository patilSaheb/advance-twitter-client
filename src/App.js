import React, { Component, Fragments} from 'react';
import { TweetBody } from './components/tweet';
import Header from './components/topHeaderMaterialize';
import './App.css';
import faker from 'faker';
import { Facebook } from 'react-content-loader';

const styles = {
  "margin": '1.1rem 0 1.1rem 2rem',
}

const MyFacebookLoader = () => <Facebook style={styles}/>

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tweets: [],
      modalIsOpen: false,
      searchQuery: 'images'
    }

    this.getFakeUser = this.getFakeUser.bind(this);
    this.getFeeds = this.getFeeds.bind(this);
    this.setSearchQuery = this.setSearchQuery.bind(this);

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
        this.generator().next()
      }
    };
  }

  componentDidMount() {
    this.generator().next();
  }

  //Twitter feeds fetch
  addFakeUser() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      let eachItem = this.fakerCall();
      arr.push(eachItem);
    }
    return arr;
  }

  fakerCall() {
    let randomEmail = faker.internet.email(),
      randomUser = `${faker.name.firstName()} ${faker.name.lastName()}`,
      randomUsername = faker.internet.domainName(),
      randomUserpic = faker.internet.avatar()
    const userObj = {
      name: randomUser,
      username: randomUsername,
      email: randomEmail,
      image: randomUserpic,
      tweet: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
    return userObj;
  }

  getFakeUser() {
    let tempArr = this.addFakeUser();
    let fakeData = this.state.fakerUsers.concat(tempArr);
    this.setState({ fakerUsers: [...fakeData] });
  }

  setSearchQuery(keyword) {
    this.setState({ searchQuery: keyword, tweets: [] }, () => {
      this.generator().next();
    });
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
      });
  }

  setLoader() {
    this.setState({ isLoading: true })
  }

  unsetLoader() {
    this.setState({ isLoading: false })
  }

  //generator application
  * generator() {
    this.setLoader();
    // yield setTimeout(() => this.getFeeds(), 0);
    // yield setTimeout(() => this.unsetLoader(), 0);
    yield this.getFeeds();
    yield this.unsetLoader();
    console.log('called gen');
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
                  console.log('user', user)
                  let name = user.user.name
                  let username = user.user.screen_name
                  let image = user.user.profile_image_url
                  let tweet = user.text
                  let tweetImg = user.entities.media
                  return (
                    <TweetBody
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
