import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import NavItems from './NavItems';

class SideNav extends React.Component {
  constructor(props) {
  super(props);
  }
  componentDidMount = () => {
  this.props.mounted(this.refs.sideNav);
  }
  render() {
    return (
      <ul id="slide-out" className="sidenav" ref='sideNav'>
        <li>
          <div className="user-view">
            <div className="background">
              <img src="/_f/images/sidenavHeader.jpg" />
            </div>
            <a href="#user"><img className="circle" src="/_f/images/profile.jpg" /></a>
            <a href="#name"><span className="white-text name">John Doe</span></a>
            <a href="#email"><span className="white-text email">jdandturk@gmail.com</span></a>
          </div>
        </li>
        <NavItems />
       </ul>
     );
  }
}

export default SideNav;
