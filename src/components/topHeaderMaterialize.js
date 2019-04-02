import React, { Component } from 'react';

const styles = {
    display: 'inline-flex',
}

const Image = (props) => {
    return (
        <img src={props.src} alt="Logo" className="profile-pic">
        </img>
    )
}

class Header extends Component {

    render() {
        let imager;
        if (this.props.userData[0]) {
            imager = <Image src={this.props.userData[0].image} />
        }
        return (
            <div className="">
                <nav>
                    <div className="nav-wrapper header-padding">
                        <a href="#!" className="brand-logo">Tweeds</a>
                        <ul className="right ">
                            <li className="search-input-style" ><div style={styles}><input placeholder="Search" id="search-query" /><i className="material-icons right">search</i></div></li>
                            <li className="profile-pic-li">{imager}</li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header