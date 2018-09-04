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
  }

  render() {
    return (
      <Fragment>
        <Head>
          <title>About | Project Coco PWA Prototype</title>
          <meta name="description" content="This is the SEO description" key="description" />
        </Head>
        <h1>About page</h1>
        <button onClick={this.handleToggle} className='waves-effect waves-light btn btn-large teal'>
          <i className="material-icons left">delete</i>
          Hide the following text
        </button>
        <div ref='test'>Click the button above to hide this text. This is a test for JQuery</div>
      </Fragment>
    )
  }
}

export default About;
