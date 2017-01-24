import React, { Component } from 'react';
import './App.css';

import Network from './components/Network';
import AttributesPane from './components/AttributesPane'
import FilterPane from './components/FilterPane'

class App extends Component {
    
    constructor(props) {
        super(props);
        this.handleActiveNodeChange = this.handleActiveNodeChange.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.state = {activeNode: {}, filterInDegree: 0};
  }
    
    handleActiveNodeChange(activeNode) {
        this.setState({activeNode: activeNode})
    }
    
    handleFilterChange(filter){
        this.setState({filterInDegree: filter})
    }
    
  render() {
      const activeNode = this.state.activeNode;
      const filterInDegree = this.state.filterInDegree;
    return (
      <div className="App">
        <div className="App-header">
          <h2>Case Law Analytics</h2>
        </div>
        <div className="App-filter-pane">
            <FilterPane onChange={this.handleFilterChange} inDegreeValue={filterInDegree}/>
        </div>
        <div className="App-network">
            <Network onChange={this.handleActiveNodeChange} filterInDegree={filterInDegree} selectedNode={activeNode}/>
        </div>
        <div className="App-attribute-pane">
            <AttributesPane activeNode={activeNode}/>
        </div>
      </div>
    );
  }
}

export default App;
