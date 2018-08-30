import React, { Component } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar.js';

import stylesheet from '../styles/main.scss';

class Index extends Component {

  componentDidMount = () => {
    if ("serviceWorker" in navigator) { navigator.serviceWorker.register("/sw.js"); }
  }

  render() {
    return (
      <div>
        <Head>
          <title>Amit is here!!!</title>
        </Head>
        <Navbar />
        <h1>Hi!</h1>
        <button className='waves-effect waves-light btn btn-large blue'>Hide Amit</button>
        <div>Amit is great!</div>
        <button className='btn btn-large green'><i className="material-icons left">add</i>Next one here</button>
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
      </div>
    )
  }
}

export default Index;
