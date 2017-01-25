import React, { Component } from 'react';


class FilterPane extends Component {
  
    constructor(props) {
        super(props);
        this.handleInDegreeChange = this.handleInDegreeChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
      }
    
    handleInDegreeChange(event) {
        var newState = {inDegreeValue: parseInt(event.target.value, 10)}
        this.props.onChange(newState);
    }
    
    handleSubjectChange(event) {
        var newState = {subjectValue: event.target.value}
        this.props.onChange(newState);
    }
    
    render() {
        if( this.props.graphProps) {
            const graphProps = this.props.graphProps;
            const minInDegree = graphProps.minInDegree;
            const maxInDegree = graphProps.maxInDegree;
            const inDegreeValue = this.props.filterState.inDegreeValue;
            const subjectValue = this.props.subjectValue;
            const subjectCategories = graphProps.subjectCategories || {};
            console.log(subjectCategories);
            const listSubjectOptions = Object.keys(subjectCategories).map(
                            (option) => <option value={option} key={option}> {subjectCategories[option]} </option> 
            );
            return(
                <div>
                    <h2>Filters</h2>

                    <div>
                      <h3>Minimum in-degree: {inDegreeValue}</h3>
                        {minInDegree} <input type="range" min={minInDegree} max={maxInDegree} value={inDegreeValue} onChange={this.handleInDegreeChange}/> {maxInDegree}
                    </div>
                    <div>
                      <h3>Rechtsgebied</h3>
                      <select value={subjectValue} onChange={this.handleSubjectChange}>
                        <option value="all">All subjects</option>
                        {listSubjectOptions}
                      </select>
                    </div>
                </div>
                );
        }
        else {
            return null;
        }
      }
}

export default FilterPane;
