import React from 'react';
import IconRenderer from './iconRenderer';

class TweetFooter extends React.Component {
    constructor(props) {
        super(props);
        this.iconObj = {
            comment: 'comment',//Comment
            repeat: 'repeat',//Retweet
            favorite_border: 'favorite',//LikeHeart
            mail_outline: 'mail'//DirectMessage
        }
    }

    render() {
        const icons = this.iconObj;
        const iconMapper = Object.keys(icons).map(key =>
            <IconRenderer key={key} name={icons[key]} />
        )

        return (
            <div className="iconInline">
                {iconMapper}
            </div>
        )
    }
}

export { TweetFooter }