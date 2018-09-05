import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import $ from 'jquery';
import SideNav from './SideNav';

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
            <Link prefetch href='/'>
              <a href="/" className="brand-logo">Project Coco</a>
            </Link>
            <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <Link prefetch href='/'>
                  <a>Home</a>
                </Link>
              </li>
              <li>
                <Link prefetch href='/about'>
                  <a>About</a>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <SideNav mounted={this.initializeSideNav} />
      </Fragment>
    );
  }
}

export default Navbar;
