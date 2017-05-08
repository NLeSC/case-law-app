import SigmaNetwork from './SigmaNetwork';
import ForceAtlas2 from './ForceAtlas2';
import React from 'react';
import {
    shallow,
    render
} from 'enzyme';


const defaultfilterState = {
    inDegreeValue: 0,
    subjectValue: '',
    minYearValue: 0,
    maxYearValue: 0,
    sizeAttributeValue: 0,
    colorAttributeValue: 0
};

const defaultGraph = {
    nodes: [],
    edges: []
};

it('should render empty component', () => {
    const loading = true;
    const sigmaNetworkJSX = <SigmaNetwork loading={loading} filterState={defaultfilterState} graph={defaultGraph}/>;
    const wrapper = shallow(sigmaNetworkJSX);
    expect(wrapper.type()).toBe(null);
});


it('should render component', () => {
    const loading = false;
    const sigmaNetworkJSX = <SigmaNetwork loading={loading} filterState={defaultfilterState} graph={defaultGraph}/>;
    const wrapper = shallow(sigmaNetworkJSX);
    expect(wrapper.find("div").length).toBe(1);
});


it('should mount ForceLayout', () => {
    const loading = false;
    const mountLayout = true;
    const sigmaNetworkJSX = <SigmaNetwork loading={loading} filterState={defaultfilterState} graph={defaultGraph}/>;
    const wrapper = shallow(sigmaNetworkJSX);
    expect(wrapper.find(ForceAtlas2)).toBeTruthy();
});
