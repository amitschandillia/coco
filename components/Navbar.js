import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import $ from 'jquery';
import SideNav from './SideNav';
import NavItems from './NavItems';

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.props = props;
  }

  initializeSideNav = (sideNav) => {
    let elems = sideNav;
    let instances = M.Sidenav.init(elems);
  }

  render() {
    return (
      <Fragment>
        <nav>
          <div className="nav-wrapper blue">
            {/*Brand name/logo*/}
            <Link prefetch href='/'>
              <a href="/" className="brand-logo">Project Coco</a>
            </Link>
            {/*Hamburger*/}
            <span data-target="slide-out" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </span>
            {/*Regular navbar for desktop screens*/}
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <NavItems />
            </ul>
          </div>
        </nav>
        {/*Sidenav for smaller screens*/}
        <SideNav mounted={this.initializeSideNav} />
      </Fragment>
    );
  }
}

export default Navbar;
