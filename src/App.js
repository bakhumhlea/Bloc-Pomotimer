import React, { Component } from 'react';
import Pomotimer from './components/Pomotimer';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.serState = {
      username: 'Guest',
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p className="App-version">v0.23</p>
          <div className="App-logo" alt="logo">
            <div className="App-logo-needle">|</div>
          </div>
          <h1 className="App-title">POMOTIMER</h1>

        </header>
        <section>
          <Pomotimer/>
        </section>
      </div>
    );
  }
}

export default App;
