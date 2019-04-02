import React from 'react';

class TweetFooter extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            active: false
        }
    }

    handleClick() { 
        console.log('clicked');
    }

    render() {
        return(
            <div className="iconInline">
            <Comment clickHandler ={this.handleClick.bind(this)}/>
            <LikeHeart clickHandler ={this.handleClick.bind(this)}/>
            <Retweet clickHandler ={this.handleClick.bind(this)}/>
            <DirectMessage clickHandler ={this.handleClick.bind(this)}/>
          </div>
        )
    }
}

const Comment = (props) => {
    return(
        <div className="actionIcons" onClick={props.clickHandler}>
        <i className="material-icons icon-color">comment</i>
      </div>
    )
}

const LikeHeart = (props) => {
    return(
        <div className="actionIcons" onClick={props.clickHandler}>
        <i className="material-icons icon-color">favorite_border</i>
      </div>
    )
}

const Retweet = (props) => {
    return(
        <div className="actionIcons" onClick={props.clickHandler}>
        <i className="material-icons icon-color">repeat</i>
      </div>
    )
}

const DirectMessage = (props) => {
    return(
        <div className="actionIcons" onClick={props.clickHandler}>
        <i className="material-icons icon-color">mail_outline</i>
      </div>
    )
}

export { TweetFooter }