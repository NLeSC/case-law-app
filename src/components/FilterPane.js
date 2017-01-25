import React, { Component } from 'react';
import './FilterPane.css';
import 'core-js/es6/weak-map';

class FilterPane extends Component {
  
    constructor(props) {
        super(props);
        this.handleInDegreeChange = this.handleInDegreeChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleMinYearChange = this.handleMinYearChange.bind(this);
        this.handleMaxYearChange = this.handleMaxYearChange.bind(this);
      }
    
    handleInDegreeChange(event) {
        var newState = {inDegreeValue: parseInt(event.target.value, 10)}
        this.props.onChange(newState);
    }
    
    handleMinYearChange(event) {
        var newState = {minYearValue: parseInt(event.target.value, 10)}
        this.props.onChange(newState);
    }
    
    handleMaxYearChange(event) {
        var newState = {maxYearValue: parseInt(event.target.value, 10)}
        this.props.onChange(newState);
    }
    
    handleSubjectChange(event) {
        var newState = {subjectValue: event.target.value}
        this.props.onChange(newState);
    }
    
    componentIsMounted(){
        //Set the default values
        var newState = {minYearValue: this.props.graphProps.minYear};
        this.props.onChange(newState);
    }
    
    render() {
        if( this.props.graphProps) {
            // Properties of the network, the possible filter values
            const graphProps = this.props.graphProps;
            const minInDegree = graphProps.minInDegree;
            const maxInDegree = graphProps.maxInDegree;
            const minYear = graphProps.minYear || 1950;
            const maxYear = graphProps.maxYear || 2016;
            const subjectCategories = graphProps.subjectCategories || {};
            const listSubjectOptions = Object.keys(subjectCategories).map(
                            (option) => <option value={option} key={option}> {subjectCategories[option]} </option> 
            );
            
            // The current values
            const inDegreeValue = this.props.filterState.inDegreeValue || minInDegree;
            const subjectValue = this.props.filterState.subjectValue;
            const minYearValue = this.props.filterState.minYearValue || minYear;
            const maxYearValue = this.props.filterState.maxYearValue || maxYear;
            return(
                <div>
                    <h2>Filters</h2>
                    <form>
                    <div>
                      <h3>Minimum in-degree: {inDegreeValue}</h3>
                        {minInDegree} <input type="range" min={minInDegree} max={maxInDegree} value={inDegreeValue} onChange={this.handleInDegreeChange}/> {maxInDegree}
                    </div>
                    <div>
                      <h3>Minimum year: {minYearValue}</h3>
                        {minYear} <input type="range" min={minYear} max={maxYear} value={minYearValue} onChange={this.handleMinYearChange}/> {maxYear}
                    </div>
                    <div>
                      <h3>Maximum year: {maxYearValue}</h3>
                        {minYear} <input type="range" min={minYear} max={maxYear} value={maxYearValue} onChange={this.handleMaxYearChange}/> {maxYear}
                    </div>
                    <div>
                      <h3>Rechtsgebied</h3>
                      <select value={subjectValue} onChange={this.handleSubjectChange}>
                        <option value="all">All subjects</option>
                        {listSubjectOptions}
                      </select>
                    </div>
                    </form>
                </div>
                );
        }
        else {
            return null;
        }
      }
}

export default FilterPane;
