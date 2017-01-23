import React, { Component } from 'react';
import './App.css';

import Network from './components/Network';
import AttributesPane from './components/AttributesPane'

class App extends Component {
    
    constructor(props) {
        super(props);
        this.handleActiveNodeChange = this.handleActiveNodeChange.bind(this);
        this.state = {activeNode: {}, };
  }
    
    handleActiveNodeChange(activeNode) {
        this.setState({activeNode: activeNode})
    }
    
  render() {
      const activeNode = this.state.activeNode;
    return (
      <div className="App">
        <div className="App-header">
          <h2>Case Law Analytics</h2>
        </div>
        <div className="App-network">
            <Network onChange={this.handleActiveNodeChange}/>
        </div>
        <div className="App-attribute-pane">
            <AttributesPane activeNode={activeNode}/>
        </div>
      </div>
    );
  }
}

export default App;
