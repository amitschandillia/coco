import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import NavItems from './NavItems';

// Materialize and dependent JQuery imports
import $ from 'jquery';
if (typeof window !== 'undefined') {
  require('materialize-css');
}

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.props = props;
  }

  componentDidMount = () => {
    var elems = document.querySelectorAll('.sidenav');
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
            <a href="javascript:void(0);" data-target="slide-out" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            {/*Regular navbar for desktop screens*/}
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <NavItems />
            </ul>
          </div>
        </nav>
        {/* Sidenav markup */}
        <ul className="sidenav" id="slide-out">
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
      </Fragment>
    );
  }
}

export default Navbar;
