import React, { Component, Fragment } from 'react';
import Link from 'next/link';

export default class SideNav extends React.Component {
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
          <Link prefetch href='/'>
            <a className="sidenav-close">Home</a>
          </Link>
        </li>
        <li>
          <Link prefetch href='/about'>
            <a className="sidenav-close">About</a>
          </Link>
        </li>
       </ul>
     );
  }
}
