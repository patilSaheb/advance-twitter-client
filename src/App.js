import React, { Component } from 'react';
import { TweetBody } from './components/tweet';
import Header from './components/topHeaderMaterialize';
import './App.css';
import faker from 'faker';
import { Facebook } from 'react-content-loader';
import { List, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import 'react-virtualized/styles.css';

const styles = {
  "margin": '1.1rem 0 1.1rem 2rem',
}

const MyFacebookLoader = () => <Facebook style={styles} />

class App extends Component {
  constructor() {
    super()
    this.state = {
      tweets: [],
      modalContent: null,
      searchQuery: 'endgame',
      modalIsOpen: false,
      noResults: false,
      divHeight: 0,
    }

    this._cache = new CellMeasurerCache({
      defaultHeight: 160,
      fixedWidth: true
    });

    this.getFeeds = this.getFeeds.bind(this);
    this.setSearchQuery = this.setSearchQuery.bind(this);
    this.modalContent = this.modalContent.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);
    this.isRowLoaded = this.isRowLoaded.bind(this);

    // Binds our scroll event handler
    window.onscroll = () => {
      // Bails early if:
      // * there's an error
      // * it's already loading
      // * there's nothing left to load
      console.log('info',window.innerHeight + document.documentElement.scrollTop,document.documentElement.offsetHeight)
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
    // console.log(this.getListItemHeight());
  }

  getListItemHeight = () => {
    console.log("test");
    console.log(this.listRef);
  }

  setSearchQuery(keyword) {
    this.setState({ searchQuery: keyword, tweets: [] }, () => {
      this.generator().next();
    });
  }

  modalContent(content) {
    this.setState({ modalContent: content }, () => {
      this.setState({ modalIsOpen: !this.state.modalIsOpen })
    })
  }

  //promises
  getFeeds() {
    fetch(`https://twit-be.herokuapp.com/megasearch/${this.state.searchQuery}`)
      .then(feeds => feeds.json())
      .then(data => {
        let stateTweets = this.state.tweets.concat(data.statuses);
        this.setState({
          tweets: stateTweets
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ noResults: !this.state.noResults });
      });
  }

  setLoader() {
    this.setState({ isLoading: !this.state.isLoading })
  }

  unsetLoader() {
    this.setState({ isLoading: false })
  }

  //generator
  * generator() {
    this.setLoader();
    yield this.getFeeds()
    yield this.unsetLoader();
  }

  rowRenderer = ({
    key,         // Unique key within array of rows
    index,       // Index of row within collection
    style, // Style object to be applied to row (to position it)
    parent
  }) => {
    let content;
    if (!this.state.tweets[index]) content = <MyFacebookLoader />;
    else {
      const { name, screen_name, profile_image_url } = this.state.tweets[index].user;
      const { media } = this.state.tweets[index].entities;
      const { text } = this.state.tweets[index];
      content = < TweetBody
        key={index}
        name={name}
        username={screen_name}
        tweet={text}
        image={profile_image_url}
        postImage={media}
      />
    }
    return (
      <CellMeasurer
        key={key}
        cache={this._cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div style={style}>
          {content}
        </div>
      </CellMeasurer>
    )
  }

  isRowLoaded({ index }) {
    return !!this.state.tweets[index];
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
                <List
                  id='v-list'
                  width={600}
                  height={700}
                  rowCount={this.state.tweets.length}
                  rowRenderer={this.rowRenderer}
                  deferredMeasurementCache={this._cache}
                  rowHeight={this._cache.rowHeight}
                  overscanRowCount={3}
                />
              </div>
              <div className="col l2"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  componentWillUnmount() {
    this._cache.clearAll();
  }

  componentDidUpdate() {
    // this.listComponent.recomputeRowHeights();
  }
}

export default App;
