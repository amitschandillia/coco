import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import $ from 'jquery';
import { findDOMNode } from 'react-dom';

import stylesheet from '../static/styles/main.scss';

class About extends Component {

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
      <Fragment>
        <Head>
          <title>Amit is here!!!</title>
          <meta name="description" content="This is the SEO description" key="description" />
        </Head>
        <h1>Hi!</h1>
        <button onClick={this.handleToggle} className='waves-effect waves-light btn btn-large blue'>Hide Amit</button>
        <div ref='test'>Amit is great!</div>
        <button className='btn btn-large green'><i className="material-icons left">add</i>Next one here</button>
        <div className='someclass'><h1>This is a new line</h1></div>
      </Fragment>
    )
  }
}

export default About;
