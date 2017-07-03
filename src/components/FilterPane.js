import React from 'react';
import {
    Component
} from 'react';
import './FilterPane.css';
import 'core-js/es6/weak-map';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Slider, {
    Range
} from 'rc-slider';
import 'rc-slider/assets/index.css';

class FilterPane extends Component {

    constructor(props) {
        super(props);
        this.handleInDegreeChange = this.handleInDegreeChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleCreatorChange = this.handleCreatorChange.bind(this);
        this.handleCommunityChange = this.handleCommunityChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleSizeAttributeChange = this.handleSizeAttributeChange.bind(this);
        this.handleColorAttributeChange = this.handleColorAttributeChange.bind(this);
        this.handleAdjustLayoutChange = this.handleAdjustLayoutChange.bind(this);
        this.handleFilterSelectedChange = this.handleFilterSelectedChange.bind(this);
    }

    handleInDegreeChange(range) {
        const newState = {
            inDegreeValue: range //parseInt(event.target.value, 10)
        };
        this.props.onChange(newState);
    }

    handleYearChange(range) {
        const newState = {
            minYearValue: range[0],
            maxYearValue: range[1]
        };
        this.props.onChange(newState);
    }

    handleAdjustLayoutChange(event) {
        const newState = {
            adjustLayout: event.target.checked
        };
        this.props.onChange(newState);
    }

    handleSubjectChange(value) {
        const newState = {
            subjectValue: value
        };
        this.props.onChange(newState);
    }

    handleCreatorChange(value) {
        const newState = {
            creatorValue: value
        };
        this.props.onChange(newState);
    }

    handleCommunityChange(value) {
        const newState = {
            communityValue: value
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

            const subjectOptions = Object.keys(subjectCategories).map(
                (option) => ({
                    value: option,
                    label: subjectCategories[option]
                }));
            const creatorOptions = Object.keys(creatorCategories).map(
                (option) => ({
                    value: option,
                    label: creatorCategories[option]
                }));
            const sizeAttributes = graphProps.sizeAttributes || [];
            const colorAttributes = graphProps.colorAttributes || [];
            const listSizeAttributes = sizeAttributes.map(
                (option) => <option value={option} key={option}> {option} </option>
            );
            const listColorAttributes = colorAttributes.map(
                (option) => <option value={option} key={option}> {option} </option>
            );

            // The current values
            const inDegreeValue = this.props.filterState.inDegreeValue || [minInDegree, maxInDegree];
            const minInDegreeValue = inDegreeValue[0];
            const maxInDegreeValue = inDegreeValue[1];
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
                const communityOptions = Object.keys(communityCategories).map(
                    (option) => ({
                        value: option,
                        label: communityCategories[option]
                    }));

                communityFilter = <div>
                    <h4>Community</h4>
                          <Select
                          name="community"
                          value={communityValue}
                          options={communityOptions}
                          onChange={this.handleCommunityChange}
                          multi
                         placeholder="Select Community"
                        />
                    </div>
            }

            return (
                <div>
                    <h2>Filters</h2>
                    <form>
                        <div>
                          <h4>In-degree: {minInDegreeValue} - {maxInDegreeValue}</h4>
                         <Range min={minInDegree} max={maxInDegree} value={[minInDegreeValue, maxInDegreeValue]} onChange={this.handleInDegreeChange} />
                        </div>
                        <div>
                          <h4>Year: {minYearValue} - {maxYearValue}</h4>
                             <Range min={minYear} max={maxYear} value={[minYearValue, maxYearValue]} onChange={this.handleYearChange} />
                        </div>
                        <div>
                            <label> Adjust layout for year slider: 
                                <input name="adjustLayout" type="checkbox" checked={adjustLayout} onChange={this.handleAdjustLayoutChange}/>
                            </label>
                        </div>
                        <div>
                          <h4>Rechtsgebied</h4>
                        <Select
                          name="subject"
                          value={subjectValue}
                          options={subjectOptions}
                          onChange={this.handleSubjectChange}
                          multi
                         placeholder="Select Subject"
                        />
                        </div>
                        <div>
                          <h4>Instantie</h4>
                        <Select
                              name="creator"
                              value={creatorValue}
                              options={creatorOptions}
                              onChange={this.handleCreatorChange}
                              multi
                             placeholder="Select Creator"
                            />
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
