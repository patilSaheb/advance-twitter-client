import React, { Component } from 'react';
import { TweetBody } from './components/tweet';
import Header from './components/topHeaderMaterialize';
import { PullToRefresh, PullDownContent, ReleaseContent, RefreshContent } from "react-js-pull-to-refresh";
import './App.css';
import faker from 'faker';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fakerUsers: [],
      error: false,
      hasMore: true,
      isLoading: false
    }
    this.handleRefresh = this.handleRefresh.bind(this);
    this.getFakeUser = this.getFakeUser.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

        // Binds our scroll event handler
        window.onscroll = () => {
          const {
            getFakeUser,
            state: {
              error,
              isLoading,
              hasMore,
            },
          } = this;
    
          // Bails early if:
          // * there's an error
          // * it's already loading
          // * there's nothing left to load
          if (error || isLoading || !hasMore) return;
    
          // Checks that the page has scrolled to the bottom
          if (
            window.innerHeight + document.documentElement.scrollTop
            === document.documentElement.offsetHeight
          ) {
            getFakeUser();
          }
        };
  }

  //needs work on pull to refresh
  handleRefresh() {
    return new Promise((resolve) => {
      this.getFakeUser()
    });
  }

  handleScroll() {
    return new Promise(() => {
      this.getFakeUser()
    })
  }

  addFakeUser() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      let eachItem = this.fakerCall();
      arr.push(eachItem);
    }
    return arr;
  }

  componentDidMount() {
    this.getFakeUser();
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
    this.setState({ fakerUsers: [...fakeData] },()=>{console.log('state',this.state)});
  }
  // dont use
  // getUser() {
  //   fetch('https://randomuser.me/api/')
  //     .then(response => {
  //       if (response.ok) return response.json();
  //       throw new Error('Request failed.');
  //     })
  //     .then(data => {
  //       this.setState({
  //         users: [
  //           {
  //             name: data.results[0].name,
  //             image: data.results[0].picture.medium,
  //             tweet: data.results[0].email,
  //           },
  //           ...this.state.users,
  //         ]
  //       });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  render() {
    return (
      <PullToRefresh
        pullDownContent={<PullDownContent />}
        releaseContent={<ReleaseContent />}
        refreshContent={<RefreshContent />}
        pullDownThreshold={2}
        onRefresh={this.handleRefresh}
        triggerHeight={50}
        backgroundColor='#e6ecf0'>
        <Header userData={this.state.fakerUsers} />
        <div className="container" onClick={this.handleScroll}>
          <div className="row">
            <div className="col l2"></div>
            <div className="col l8">
              <div className="main-body" >
                {[...this.state.fakerUsers].map((user, index) => {
                  let name = user.name
                  let username = user.username
                  let image = user.image
                  let tweet = user.tweet
                  return (
                    <TweetBody
                      key={index}
                      name={name}
                      username={username}
                      tweet={tweet}
                      image={image} />
                  )
                })}
              </div>
            </div>
            <div className="col l2"></div>
          </div>
        </div>
      </PullToRefresh>
    );
  }
}

export default App;
