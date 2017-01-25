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
        this.setFilterValues = this.setFilterValues.bind(this);
        this.state = {activeNode: {}, filterState: {inDegreeValue: 0}, graphProps: {}};
  }
    
    handleActiveNodeChange(activeNode) {
        this.setState({activeNode: activeNode})
    }
    
    handleFilterChange(newFilterState){
        // Merge the new filter state into the old one
        console.log(newFilterState);
        this.setState(function(prevState, props){
            var mergedFilterState = prevState.filterState;
            for (var attrname in newFilterState) { mergedFilterState[attrname] = newFilterState[attrname]; }
            return {filterState: mergedFilterState};
        } );
        console.log(this.state);
    }
    
    setFilterValues(graphProps){
        this.setState({graphProps: graphProps});
    }
    
  render() {
      const activeNode = this.state.activeNode;
      const filterState = this.state.filterState;
      const graphProps = this.state.graphProps;
    return (
      <div className="App">
        <div className="App-header">
          <h2>Case Law Analytics</h2>
        </div>
        <div className="App-filter-pane">
            <FilterPane onChange={this.handleFilterChange}
                        filterState={filterState}
                        graphProps={graphProps} />
        </div>
        <div className="App-network">
            <Network onChange={this.handleActiveNodeChange} filterState={filterState} selectedNode={activeNode}
                    onInitialization={this.setFilterValues}/>
        </div>
        <div className="App-attribute-pane">
            <AttributesPane activeNode={activeNode}/>
        </div>
      </div>
    );
  }
}

export default App;
