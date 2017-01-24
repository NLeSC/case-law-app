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
        return(
            <div>
                <h2>Filters</h2>

                <div>
                  <h3>Minimum in-degree: {this.props.inDegreeValue}</h3>
                  0 <input type="range" min={0} max={5} value={this.props.inDegreeValue} onChange={this.handleChange}/> 5 
                </div>
            </div>
            );
      }
}

export default FilterPane;
