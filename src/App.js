import React, { Component } from 'react';
import { TweetBody } from './components/tweet';
import Header from './components/topHeaderMaterialize';
import './App.css';
import faker from 'faker';
import { Facebook } from 'react-content-loader';
import { List, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import 'react-virtualized/styles.css';
import { fetchTweets, searchTweets, clearTweets, displayNoResults } from "./actions/actions";
import { connect } from "react-redux";
import {Error, NoTweets} from './components/handlerComponent';

const styles = {
  "width": "600px",
  "height": "auto",
  "padding": "0.5rem",
  "backgroundColor": "white"
}

const MyFacebookLoader = () => <Facebook style={styles} />

const cache = new CellMeasurerCache({
  defaultHeight: 160,
  defaultWidth: 205,
  fixedWidth: true
});

class App extends Component {
  constructor() {
    super()
  
    this._avatar = faker.internet.avatar();
    this.rowRenderer = this.rowRenderer.bind(this);
    this.isRowLoaded = this.isRowLoaded.bind(this);
    this.detectScroll = this.detectScroll.bind(this);
  }

  componentDidMount() {
    this.props.fetchTweets(this.props.searchKeyword);
    cache.clearAll();
  }

  detectScroll = (e) => {
    if (e) {
      const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
       if (bottom) {
          this.props.fetchTweets(this.props.searchKeyword);
       }
    }
  }

  rowRenderer = ({
    key,         // Unique key within array of rows
    index,       // Index of row within collection
    style, // Style object to be applied to row (to position it)
    parent
  }) => {
    let content;
    const { name, screen_name, profile_image_url } = this.props.tweets[index].user;
    const { media } = this.props.tweets[index].entities;
    const { text } = this.props.tweets[index];
    content = < TweetBody
      key={index}
      name={name}
      username={screen_name}
      tweet={text}
      image={profile_image_url}
      postImage={media}
      className="override-absolute"
    />
    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div style={style} >
          {content}
        </div>
      </CellMeasurer>
    )
  }

  isRowLoaded({ index }) {
    return !!this.props.tweets[index];
  }

  render() {
    const preload = this.props.loading ? <MyFacebookLoader /> : null
    const noTweets = this.props.noResults ? <NoTweets/> : null;
    const content = this.props.error !== null ? <Error errMsg={this.props.error}/> : <List
    id='v-list'
    width={600}
    height={700}
    rowCount={this.props.tweets.length}
    rowRenderer={this.rowRenderer}
    deferredMeasurementCache={cache}
    rowHeight={cache.rowHeight}
    overscanRowCount={3}
  />
    return (
      <div className="main-body">
        <Header profilePic={this._avatar} searchCallback={this.props.searchTweets} />
        <main role="main" id='main-div'>
          <div className="container">
            <div className="row">
              <div className="col l2"></div>
              <div id='list-container' className="col l8" onScroll={this.detectScroll}>
                {noTweets}
                {content}
                {preload}
              </div>
              <div className="col l2"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tweets !== this.props.tweets ) {
      cache.clearAll();
    }
  }

  componentWillUnmount() {
    this.props.clearTweets();
  }
}

const mapStateToProps = state => {
  return {
    searchKeyword: state.tweets.searchKeyword,
    tweets: state.tweets.newTweets,
    loading: state.tweets.loading,
    error: state.tweets.error,
    noResults: state.tweets.noResults
  }
};

const mapDispatchToProps = {
  fetchTweets,
  searchTweets,
  clearTweets,
  displayNoResults
};

export default connect(mapStateToProps, mapDispatchToProps)(App);