import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import Image from '../components/Image';

import stylesheet from '../static/styles/main.scss';

class Index extends Component {

  componentDidMount = () => {
    if ("serviceWorker" in navigator) { navigator.serviceWorker.register("/sw.js"); }
  }

  render() {
    return (
      <Fragment>
        <Head>
          <title>Home | Project Coco PWA Prototype</title>
          <meta name="description" content="This is the SEO description" key="description" />
        </Head>
        <h1>Home page</h1>
        <button className='waves-effect waves-light btn btn-large blue'>
          <i className="material-icons left">cloud</i>
          Sample Button
        </button>
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s6">
                <input id="input_text" type="text" data-length="10" />
                <label for="input_text">Sample Input Box</label>
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    )
  }
}

export default Index;
