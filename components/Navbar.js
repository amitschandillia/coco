import React, { Component } from 'react';
import Link from 'next/link';

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.props = props;
  }
  render() {
    return (

      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">Logo</a>
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
              <Link prefetch href='/demopage'>
                <a>Demo</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
