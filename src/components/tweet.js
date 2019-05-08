import React from 'react';
import { TweetFooter } from './tweetFooter';

const TweetBox = (props) => {
  return (
    <div className="tweet-body">
      {props.children}
    </div>
  )
}

const ProfileImage = (props) => {
  return (
    <img src={props.image} alt="Logo" className="picture">
    </img>
  )
}

const TweetImage = (props) => {
  return (
    <div className="tweetImage">
      <img src={props.imageSrc} alt="Logo" />
    </div>
  )
}

const Handle = (props) => {
  return (
    <div className="handle">
      {props.email}
    </div>
  )
}

const Name = (props) => {
  return (
    <div className="name">
      {props.name}
    </div>
  )
}

const Tweet = (props) => {
  return (
    <div className="tweet">
      {props.tweet}
    </div>
  )
}

class TweetBody extends React.Component {

  popOut = (e) => {
    console.log('children',this);
    this.props.popOut(this.props)
  }

  render() {
    let postImage = '';
    if(this.props.postImage){
      postImage = <TweetImage imageSrc={this.props.postImage[0].media_url} />
    }
    
    return (
      <TweetBox>
        <div className="inner-body">
          <ProfileImage image={this.props.image} />
          <div className="outer-body">
            <div className="inner-body">
              <Name name={this.props.name} />
              <Handle email={this.props.username} />
            </div>
            <Tweet tweet={this.props.tweet} />
            {postImage}
            <TweetFooter />
          </div>
        </div>
      </TweetBox>
    )
  }
}

export { TweetBody }