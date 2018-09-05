import React, { Component, Fragment } from 'react';
import Link from 'next/link';

class NavItems extends Component {

  render() {
    return (
      <Fragment>
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
      </Fragment>
    );
  }
}

export default NavItems;
