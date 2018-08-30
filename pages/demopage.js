import React, { Component } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar.js';
import $ from 'jquery';
import { findDOMNode } from 'react-dom';

import stylesheet from '../styles/main.scss';

class DemoPage extends Component {

  handleToggle = () => {
    const el = findDOMNode(this.refs.test);
    $(el).slideToggle();
  }

  componentDidMount = () => {
    if ("serviceWorker" in navigator) { navigator.serviceWorker.register("/sw.js"); }
    const el = findDOMNode(this.refs.test);
    $(el).text('new amit');
  }

  render() {
    return (
      <div>
        <Head>
          <title>Amit is here!!!</title>
        </Head>
        <Navbar />
        <h1>Hi!</h1>
        <button onClick={this.handleToggle} className='waves-effect waves-light btn btn-large blue'>Hide Amit</button>
        <div ref='test'>Amit is great!</div>
        <button className='btn btn-large green'><i className="material-icons left">add</i>Next one here</button>
        <div className='someclass'><h1>This is a new line</h1></div>
      </div>
    )
  }
}

export default DemoPage;
