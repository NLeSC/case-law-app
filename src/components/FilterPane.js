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
        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.handleSizeAttributeChange = this.handleSizeAttributeChange.bind(this);
        this.handleColorAttributeChange = this.handleColorAttributeChange.bind(this);
        this.handleAdjustLayoutChange = this.handleAdjustLayoutChange.bind(this);
        this.handleFilterSelectedChange = this.handleFilterSelectedChange.bind(this);
        this.handleSliderAttributeChange = this.handleSliderAttributeChange.bind(this);
    }

    handleInDegreeChange(range) {
        const newState = {
            inDegreeValue: range //parseInt(event.target.value, 10)
        };
        this.props.onChange(newState);
    }

    handleSliderChange(range) {
        const newState = {
            minSliderValue: range[0],
            maxSliderValue: range[1]
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

    handleSliderAttributeChange(event) {
        const newState = {
            sliderAttributeValue: event.target.value,
            minSliderValue: null,
            maxSliderValue: null
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
            minSliderValue: null,
            maxSliderValue: null
        };
        this.props.onChange(newState);
    }

    render() {
        if (this.props.graphProps) {
            // Properties of the network, the possible filter values
            const graphProps = this.props.graphProps;
            const minInDegree = graphProps.minInDegree || 0;
            const maxInDegree = graphProps.maxInDegree || 0;
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
            const sliderMinMaxValues = graphProps.sliderMinMaxValues || {};
            const sliderAttributes = Object.keys(sliderMinMaxValues);
            const listSliderAttributes = sliderAttributes.map(
                (option) => <option value={option} key={option}> {option} </option>
            );

            // The current values
            // TODO: adjust indegree to slider prop 
            const inDegreeValue = this.props.filterState.inDegreeValue || [minInDegree, maxInDegree];
            const minInDegreeValue = inDegreeValue[0];
            const maxInDegreeValue = inDegreeValue[1];
            const subjectValue = this.props.filterState.subjectValue;
            const creatorValue = this.props.filterState.creatorValue;
            const communityValue = this.props.filterState.communityValue;
            const sizeAttributeValue = this.props.filterState.sizeAttributeValue;
            const colorAttributeValue = this.props.filterState.colorAttributeValue;
            const adjustLayout = this.props.filterState.adjustLayout;
            const filterSelected = this.props.filterState.filterSelected; //|| false;
            const sliderAttributeValue = this.props.filterState.sliderAttributeValue; // || 'year';

            const slider_minmax = sliderMinMaxValues[sliderAttributeValue] || [0, 1];
            const minSliderValue = this.props.filterState.minSliderValue || slider_minmax[0];
            const maxSliderValue = this.props.filterState.maxSliderValue || slider_minmax[1];
            let communityFilter = null;
            if (Object.keys(communityCategories).length > 0) {
                const communityOptions = Object.keys(communityCategories).map(
                    (option) => ({
                        value: option,
                        label: communityCategories[option]
                    }));

                communityFilter = <li className="App-filterItem">
                    <h3>Community</h3>
                          <Select
                          name="community"
                          value={communityValue}
                          options={communityOptions}
                          onChange={this.handleCommunityChange}
                          multi
                         placeholder="Select Community"
                        />
                    </li>
            }

            return (
                <div className="App-filterContent">
                    <form>
                        <li className="App-filterItem">
                          <h3>In-degree: {minInDegreeValue} - {maxInDegreeValue}</h3>
                         <Range min={minInDegree} max={maxInDegree} value={[minInDegreeValue, maxInDegreeValue]} onChange={this.handleInDegreeChange} />
                        </li>
                        <li className="App-filterItem">
                          <h3><select value={sliderAttributeValue} onChange={this.handleSliderAttributeChange}>
                            {listSliderAttributes}
                          </select>: {minSliderValue} - {maxSliderValue}</h3>
                             <Range min={slider_minmax[0]} max={slider_minmax[1]} value={[minSliderValue, maxSliderValue]} onChange={this.handleSliderChange} />
                        </li>
                        <li className="App-filterItem">
                            <h3> Adjust layout for slider: 
                                <input name="adjustLayout" type="checkbox" checked={adjustLayout} onChange={this.handleAdjustLayoutChange}/>
                                </h3>
                        </li>
                        <li className="App-filterItem">
                          <h3>Rechtsgebied</h3>
                        <Select
                          name="subject"
                          value={subjectValue}
                          options={subjectOptions}
                          onChange={this.handleSubjectChange}
                          multi
                         placeholder="Select Subject"
                        />
                        </li>
                        <li className="App-filterItem">
                          <h3>Instantie</h3>
                        <Select
                              name="creator"
                              value={creatorValue}
                              options={creatorOptions}
                              onChange={this.handleCreatorChange}
                              multi
                             placeholder="Select Creator"
                            />
                        </li>
                        {communityFilter}
                        <li className="App-filterItem">
                           
                            <h3> Filter selected:
                                <input name="filterSelected" type="checkbox" checked={filterSelected} onChange={this.handleFilterSelectedChange}/>
                            </h3>
                        </li>
                       
                        <li className="App-filterItem">
                          <h3>Node Size</h3>
                          <select value={sizeAttributeValue} onChange={this.handleSizeAttributeChange}>
                            {listSizeAttributes}
                          </select>
                        </li>
                        <li className="App-filterItem">
                          <h3>Node Color</h3>
                          <select value={colorAttributeValue} onChange={this.handleColorAttributeChange}>
                            <option value="none">none</option>
                            {listColorAttributes}
                          </select>
                        </li>
                    </form>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default FilterPane;
