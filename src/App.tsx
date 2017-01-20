import * as React from 'react';

import './App.css';
import logo from './logo.svg';

import Network from './components/Network';

export class App extends React.Component<{}, {}> {
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
