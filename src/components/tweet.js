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
  const style = {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: `url(${props.media_url_https})`,
    width: `${props.widthSize}px`,
    height: `${props.heightSize}px`,
    maxWidth: '32rem',
    maxHeight: '23rem'
  };
  return (
    <div className="tweet-image">
      <div style={style}></div>
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
  let tweet = props.tweet;
  tweet = tweet.length > 60 && props.hasImage ? `${(tweet.substring(0, Math.min(tweet.length, 70)))}...`: tweet;
  return (
    <div className="tweet">
      {tweet}
    </div>
  )
}

class TweetBody extends React.Component {

  popOut = (e) => {
    console.log('children', this);
    this.props.popOut(this.props)
  }

  render() {
    let postImage = '';
    let hasImage = false;
    if (this.props.postImage) {
      hasImage = true;
      postImage = <TweetImage
        media_url_https={this.props.postImage[0].media_url_https}
        widthSize={this.props.postImage[0].sizes.small.w}
        heightSize={this.props.postImage[0].sizes.small.h}
      />
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
            <Tweet tweet={this.props.tweet} hasImage={hasImage}/>
            {postImage}
            <TweetFooter />
          </div>
        </div>
      </TweetBox>
    )
  }
}

export { TweetBody }