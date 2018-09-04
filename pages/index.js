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
          <title>Amit is here!!!</title>
          <meta name="description" content="This is the SEO description" key="description" />
        </Head>
        <h1>Hi!</h1>
        <button className='waves-effect waves-light btn btn-large blue'>Hide Amit</button>
        <div>Amit is great!</div>
        <button className='btn btn-large green'><i className="material-icons left">cloud</i>Next one here</button>
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s6">
                <input id="input_text" type="text" data-length="10" />
                <label for="input_text">Input text</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <textarea id="textarea2" className="materialize-textarea" data-length="120"></textarea>
                <label for="textarea2">Textarea</label>
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    )
  }
}

export default Index;
