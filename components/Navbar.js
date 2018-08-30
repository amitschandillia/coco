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
        <div>
          <Link href='/'>
            <a>Home</a>
          </Link>
          <Link href='/about'>
            <a>About</a>
          </Link>
          <Link href='/demopage'>
            <a>Demo</a>
          </Link>
          <mark className={'badge'}>Hello!</mark>
        </div>
      </nav>
    );
  }
}

export default Navbar;
