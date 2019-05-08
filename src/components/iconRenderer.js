import React from 'react';

class Icon extends React.Component {
    constructor(props) {
        super(props);
        this.iconId = 'base';
        this.iconStatus = "";
        this.state = {
            status: this.props.status
        }
        this.changeStatus = this.changeStatus.bind(this);//always bind in constructor to avail props in react DOM
    }
    changeStatus(){
        this.setState({
            status : !this.state.status
        })
    }

    render() {
        let iconStatus = this.state.status? "icon-color-active" : "";
        return (
            <div className="actionIcons" onClick={this.changeStatus}>
                <i className={"material-icons icon-color "+ iconStatus}>{this.iconId}</i>
            </div>
        )
    }
}

//reduced code with usage of prototypal inheritance
export default class IconRenderer extends Icon {
    constructor(props) {
        super(props);
        this.iconId = this.props.name;
    }
    render() {
        return super.render();
    }
}

//old code with repetitive components
// export class Comment extends Icon {
//     constructor(props) {
//         super(props);
//         this.iconId = this.props.name;
//         this.handler = this.props.clickHandler;
//     }

//     render() {
//         return super.render();
//     }
// }

// export class LikeHeart extends Icon {
//     constructor(props) {
//         super(props);
//         this.iconId = 'favorite_border';
//         this.handler = this.props.clickHandler;
//     }

//     render() {
//         return super.render();
//     }
// }

// export class Retweet extends Icon {
//     constructor(props) {
//         super(props);
//         this.iconId = 'repeat';
//         this.handler = this.props.clickHandler;
//     }

//     render() {
//         return super.render();
//     }
// }

// export class DirectMessage extends Icon {
//     constructor(props) {
//         super(props);
//         this.iconId = 'mail_outline';
//         this.handler = this.props.clickHandler;
//     }

//     render() {
//         return super.render();
//     }
// }