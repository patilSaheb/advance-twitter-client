import React, { Component } from 'react';

class Header extends Component {
    render() {
      return (
        <div className="header">
            <form className="search-form" >
                <input className="search-input-style" id="search-query"></input>
                <span className="icon-span"></span>
            </form>
        </div>
      );
    }
  }
  
  export default Header