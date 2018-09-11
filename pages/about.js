import React, { Component, Fragment } from 'react';
import Head from 'next/head';
// import $ from 'jquery';
import stylesheet from '../static/styles/main.scss';

class About extends Component {
  componentDidMount() {
    if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/sw.js'); }
  }

  render() {
    const title = 'About | New Project Coco PWA Prototype';
    const description = 'This is the description for the about page';
    return (
      <Fragment>
        <Head>
          <title>{ title }</title>
          <meta name="description" content={description} key="description" />
        </Head>
        <h1>About page</h1>
        <button type="button" onClick={this.handleToggle} className="waves-effect waves-light btn btn-large teal">
          <i className="material-icons left">delete</i>
          Some random text
        </button>
      </Fragment>
    );
  }
}

export default About;
