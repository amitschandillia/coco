import React, { Component } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar.js';

import stylesheet from '../styles/main.scss';

class About extends Component {

  componentDidMount = () => {
    if ("serviceWorker" in navigator) { navigator.serviceWorker.register("/sw.js"); }
  }

  render() {
    return (
      <div>
        <Head>
          <title>Learn more about us...</title>
        </Head>
        <Navbar />
        <h1>Hi!</h1>
        <button className='waves-effect waves-light btn btn-large blue'>Hide Amit</button>
        <div>This text cannot be removed</div>
        <button className='btn btn-large green'><i className="material-icons left">add</i>Next one here</button>
      </div>
    )
  }
}

export default About;
