import React, { Component } from 'react';

const styles = {
    display: 'inline-flex',
}
const Image = (props) => {
    return (
        <img src={props.src} alt="No Pic" className="profile-pic">
        </img>
    )
}

class Header extends Component {
    _handleKeyDown = (e) => {
        const validString = /^[\w\-\s]+$/.test(e.target.value);
        // console.log(/^[\w\-\s]+$/.test(e.target.value));
        if (e.key === 'Enter' && validString) {
          this.props.searchCallback(e.target.value);
        }
      }

    render() {
        let imager;
        if (this.props.profilePic) {
            imager = <Image src={this.props.profilePic} />
        }
        return (
            <div className="">
                <nav>
                    <div className="nav-wrapper header-padding">
                        <a href="#!" className="brand-logo">Tweeds</a>
                        <ul className="right ">
                            <li className="search-input-style" >
                                <div style={styles} id="searchForm">
                                    <input
                                        placeholder="Search for..."
                                        onKeyDown={this._handleKeyDown}
                                        pattern="/^[\w\-\s]+$/"
                                        title="No special characters"
                                    />
                                    <i className="material-icons right">search</i>
                                </div>
                            </li>
                            <li className="profile-pic-li">{imager}</li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header