import SigmaNetwork from './SigmaNetwork';
import ForceLayoutNoverlap from './ForceLayoutNoverlap';
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

it('should render empty component', () => {
    const loading = true;
    const sigmaNetworkJSX = <SigmaNetwork loading={loading} filterState={defaultfilterState}/>;
    const wrapper = shallow(sigmaNetworkJSX);
    expect(wrapper.type()).toBe(null);
});


it('should render component', () => {
    const loading = false;
    const sigmaNetworkJSX = <SigmaNetwork loading={loading} filterState={defaultfilterState}/>;
    const wrapper = shallow(sigmaNetworkJSX);
    expect(wrapper.find("div")).toHaveLength(1);
});


it('should mount ForceLayout', () => {
    const loading = false;
    const mountLayout = true;
    const sigmaNetworkJSX = <SigmaNetwork loading={loading} filterState={defaultfilterState}/>;
    const wrapper = shallow(sigmaNetworkJSX);
    expect(wrapper.find(ForceLayoutNoverlap)).toBeTruthy();
});
