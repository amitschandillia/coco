import React, { Component } from 'react';
import Link from 'next/link';
import $ from 'jquery';

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.props = props;
  }

  componentDidMount = () => {
      $(document).ready(function(){
      $('.sidenav').sidenav();
    });
  }

  render() {
    return (

      <section>
        <nav>
          <div className="nav-wrapper">
            <a href="/" className="brand-logo">Logo</a>
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
                <Link prefetch href='/demopage'>
                  <a>Demo</a>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <ul className="sidenav" id="slide-out">
          <li><a href="sass.html">Sass</a></li>
          <li><a href="badges.html">Components</a></li>
        </ul>
      </section>
    );
  }
}

export default Navbar;
