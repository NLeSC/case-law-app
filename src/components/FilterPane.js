import React from 'react';
import {
    Component
} from 'react';
import './FilterPane.css';
import 'core-js/es6/weak-map';

class FilterPane extends Component {

    constructor(props) {
        super(props);
        this.handleInDegreeChange = this.handleInDegreeChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleCreatorChange = this.handleCreatorChange.bind(this);
        this.handleCommunityChange = this.handleCommunityChange.bind(this);
        this.handleMinYearChange = this.handleMinYearChange.bind(this);
        this.handleMaxYearChange = this.handleMaxYearChange.bind(this);
        this.handleSizeAttributeChange = this.handleSizeAttributeChange.bind(this);
        this.handleColorAttributeChange = this.handleColorAttributeChange.bind(this);
        this.handleAdjustLayoutChange = this.handleAdjustLayoutChange.bind(this);
        this.handleFilterSelectedChange = this.handleFilterSelectedChange.bind(this);
    }

    handleInDegreeChange(event) {
        const newState = {
            inDegreeValue: parseInt(event.target.value, 10)
        };
        this.props.onChange(newState);
    }

    handleMinYearChange(event) {
        const newState = {
            minYearValue: parseInt(event.target.value, 10)
        };
        this.props.onChange(newState);
    }

    handleMaxYearChange(event) {
        const newState = {
            maxYearValue: parseInt(event.target.value, 10)
        };
        this.props.onChange(newState);
    }

    handleAdjustLayoutChange(event) {
        const newState = {
            adjustLayout: event.target.checked
        };
        this.props.onChange(newState);
    }

    handleSubjectChange(event) {
        const newState = {
            subjectValue: event.target.value
        };
        this.props.onChange(newState);
    }

    handleCreatorChange(event) {
        const newState = {
            creatorValue: event.target.value
        };
        this.props.onChange(newState);
    }

    handleCommunityChange(event) {
        const newState = {
            communityValue: event.target.value
        };
        this.props.onChange(newState);
    }

    handleSizeAttributeChange(event) {
        const newState = {
            sizeAttributeValue: event.target.value
        };
        this.props.onChange(newState);
    }

    handleColorAttributeChange(event) {
        const newState = {
            colorAttributeValue: event.target.value
        };
        this.props.onChange(newState);
    }

    handleFilterSelectedChange(event) {
        const newState = {
            filterSelected: event.target.checked
        };
        this.props.onChange(newState);
    }

    componentIsMounted() {
        //Set the default values
        const newState = {
            minYearValue: this.props.graphProps.minYear
        };
        this.props.onChange(newState);
    }

    render() {
        if (this.props.graphProps) {
            // Properties of the network, the possible filter values
            const graphProps = this.props.graphProps;
            const minInDegree = graphProps.minInDegree || 0;
            const maxInDegree = graphProps.maxInDegree || 0;
            const minYear = graphProps.minYear || 1950;
            const maxYear = graphProps.maxYear || 2016;
            const subjectCategories = graphProps.subjectCategories || {};
            const creatorCategories = graphProps.creatorCategories || {};
            const communityCategories = graphProps.communityCategories || {};
            const listSubjectOptions = Object.keys(subjectCategories).map(
                (option) => <option value={option} key={option}> {subjectCategories[option]} </option>
            );

            const listCreatorOptions = Object.keys(creatorCategories).map(
                (option) => <option value={option} key={option}> {creatorCategories[option]} </option>
            );
            const sizeAttributes = graphProps.sizeAttributes || [];
            const colorAttributes = graphProps.colorAttributes || [];
            const listSizeAttributes = sizeAttributes.map(
                (option) => <option value={option} key={option}> {option} </option>
            );
            const listColorAttributes = colorAttributes.map(
                (option) => <option value={option} key={option}> {option} </option>
            );

            // The current values
            const inDegreeValue = this.props.filterState.inDegreeValue || minInDegree;
            const subjectValue = this.props.filterState.subjectValue;
            const creatorValue = this.props.filterState.creatorValue;
            const communityValue = this.props.filterState.communityValue;
            const minYearValue = this.props.filterState.minYearValue || minYear;
            const maxYearValue = this.props.filterState.maxYearValue || maxYear;
            const sizeAttributeValue = this.props.filterState.sizeAttributeValue;
            const colorAttributeValue = this.props.filterState.colorAttributeValue;
            const adjustLayout = this.props.filterState.adjustLayout;
            const filterSelected = this.props.filterState.filterSelected; //|| false;

            let communityFilter = null;
            if (Object.keys(communityCategories).length > 0) {
                const listCommunityOptions = Object.keys(communityCategories).map(
                    (option) => <option value={option} key={option}> {communityCategories[option]} </option>
                );
                communityFilter = <div>
                    <h4>Community</h4>
                          <select value={communityValue} onChange={this.handleCommunityChange}>
                            <option value="all">All</option>
                            {listCommunityOptions}
                          </select>
                    </div>
            }

            return (
                <div>
                    <h2>Filters</h2>
                    <form>
                        <div>
                          <h4>Minimum in-degree: {inDegreeValue}</h4>
                            {minInDegree} <input type="range" min={minInDegree} max={maxInDegree} value={inDegreeValue} onChange={this.handleInDegreeChange}/> {maxInDegree}
                        </div>
                        <div>
                          <h4>Minimum year: {minYearValue}</h4>
                            {minYear} <input type="range" min={minYear} max={maxYear} value={minYearValue} onChange={this.handleMinYearChange}/> {maxYear}
                        </div>
                        <div>
                          <h4>Maximum year: {maxYearValue}</h4>
                            {minYear} <input type="range" min={minYear} max={maxYear} value={maxYearValue} onChange={this.handleMaxYearChange}/> {maxYear}
                        </div> 
                        <div>
                            <label> Adjust layout for year slider: 
                                <input name="adjustLayout" type="checkbox" checked={adjustLayout} onChange={this.handleAdjustLayoutChange}/>
                            </label>
                        </div>
                        <div>
                          <h4>Rechtsgebied</h4>
                          <select value={subjectValue} onChange={this.handleSubjectChange}>
                            <option value="all">All subjects</option>
                            {listSubjectOptions}
                          </select>
                        </div>
                        <div>
                          <h4>Instantie</h4>
                          <select value={creatorValue} onChange={this.handleCreatorChange}>
                            <option value="all">All creators</option>
                            {listCreatorOptions}
                          </select>
                        </div>
                        {communityFilter}
                        <div>
                            <h4>Selection </h4>
                            <label> Filter selected:
                                <input name="filterSelected" type="checkbox" checked={filterSelected} onChange={this.handleFilterSelectedChange}/>
                            </label>
                        </div>
                        <h2> Appearances </h2>
                        <div>
                          <h4>Node Size</h4>
                          <select value={sizeAttributeValue} onChange={this.handleSizeAttributeChange}>
                            {listSizeAttributes}
                          </select>
                        </div>
                        <div>
                          <h4>Node Color</h4>
                          <select value={colorAttributeValue} onChange={this.handleColorAttributeChange}>
                            <option value="none">none</option>
                            {listColorAttributes}
                          </select>
                        </div>
                    </form>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default FilterPane;
