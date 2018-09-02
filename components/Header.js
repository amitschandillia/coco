import React, { Component } from 'react';
import Router from 'next/router';
import Head from 'next/head';

import Navbar from './Navbar';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="description" key="description" content="An example PWA" />
          <meta name="viewport" key="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0" />
          <meta name="theme-color" key="theme-color" content="#302ecd" />
          <link rel="manifest" href="/_next/static/manifest.json" />
          <link rel="icon" type="image/x-icon" href="favicon.ico" />
          <link rel="stylesheet" type="text/css" href={`_s/${process.env.CSS}.min.css`} />
        </Head>
        <Navbar />
      </div>
    );
  }
}

export default Header;
