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
        <NavItems />
       </ul>
     );
  }
}

export default SideNav;
