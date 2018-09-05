import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import $ from 'jquery';

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.props = props;
  }

  // componentDidMount = () => {
  //   document.addEventListener('DOMContentLoaded', function() {
  //     var elems = document.querySelectorAll('.sidenav');
  //     var instances = M.Sidenav.init(elems, options);
  //   });
  // }

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
              <li>
              </li>
            </ul>
          </div>
        </nav>
        {/* Sidenav markup */}
        <ul className="sidenav" id="slide-out">
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
      </Fragment>
    );
  }
}

export default Navbar;
