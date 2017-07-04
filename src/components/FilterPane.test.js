import FilterPane from './FilterPane';
import React from 'react';
import {
    shallow,
    render
} from 'enzyme';

it('should construct FilterPane component', () => {

    const filterPane = new FilterPane({});
    expect(filterPane.props).toEqual({});
});


it('should render empty component', () => {
    const onChange = jest.fn();
    const filterState = {};
    const graphProps = {};
    const filterPaneJSX = <FilterPane onChange={onChange}/>;
    const wrapper = shallow(filterPaneJSX);
    expect(wrapper.type()).toBe(null);
});


it('should render component', () => {
    const onChange = jest.fn();
    const filterState = {};
    const graphProps = {};
    const filterPaneJSX = <FilterPane onChange={onChange}
                                filterState={filterState}
                                graphProps={graphProps} />;
    const wrapper = render(filterPaneJSX);
    expect(wrapper.find("form").length).toBe(1);
});


it('should trigger props.onChange', () => {
    const value = [0, 1];
    const onChange = jest.fn();
    const filterState = {};
    const graphProps = {};
    const filterPane = new FilterPane({
        onChange,
        filterState,
        graphProps
    });

    filterPane.handleInDegreeChange(value);

    expect(onChange).toBeCalledWith({
        inDegreeValue: [0, 1]
    });
});
