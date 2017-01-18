import React, { Component } from 'react';
import './App.css';

import Network from './components/Network';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Case Law Analytics</h2>
        </div>
        <div className="App-network">
            <Network />
        </div>
      </div>
    );
  }
}

export default App;
