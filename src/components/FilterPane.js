import React, { Component } from 'react';


class FilterPane extends Component {
  
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
      }
    
    handleChange(event) {
        this.props.onChange(event.target.value);
    }
    
    render() {
        const minInDegree = this.props.graphProps.minInDegree;
        const maxInDegree = this.props.graphProps.maxInDegree;
        return(
            <div>
                <h2>Filters</h2>

                <div>
                  <h3>Minimum in-degree: {this.props.inDegreeValue}</h3>
                    {minInDegree} <input type="range" min={minInDegree} max={maxInDegree} value={this.props.inDegreeValue} onChange={this.handleChange}/> {maxInDegree}
                </div>
            </div>
            );
      }
}

export default FilterPane;
