import React, { Component } from 'react';


class FilterPane extends Component {
  
    constructor(props) {
        super(props);
        this.handleInDegreeChange = this.handleInDegreeChange.bind(this);
      }
    
    handleInDegreeChange(event) {
        var newState = {inDegreeValue: parseInt(event.target.value, 10)}
        this.props.onChange(newState);
    }
    
    render() {
        const minInDegree = this.props.graphProps.minInDegree;
        const maxInDegree = this.props.graphProps.maxInDegree;
        const inDegreeValue = this.props.filterState.inDegreeValue;
        return(
            <div>
                <h2>Filters</h2>

                <div>
                  <h3>Minimum in-degree: {inDegreeValue}</h3>
                    {minInDegree} <input type="range" min={minInDegree} max={maxInDegree} value={inDegreeValue} onChange={this.handleInDegreeChange}/> {maxInDegree}
                </div>
                <div>
                  <h3>Rechtsgebied</h3>
                  <select>
                    <option value="">All categories</option>
                  </select>
                </div>
            </div>
            );
      }
}

export default FilterPane;
