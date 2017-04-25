import LoadData from './LoadData';
import React from 'react';
import {
    shallow,
    render
} from 'enzyme';
import FileInput from 'react-simple-file-input';

it('should construct LoadData component', () => {
    const onClick = jest.fn();
    const loadData = new LoadData({
        onClick: onClick
    });
    expect(loadData.state).toEqual({});
    expect(loadData.props.onClick).toEqual(onClick);
});


it('should render component', () => {
    const onClick = jest.fn();
    const loadDataJSX = <LoadData onClick = {onClick}/ >;
    const wrapper = render(loadDataJSX);
    expect(wrapper.find(".inputClass").length).toBe(1);
    expect(wrapper.find(FileInput)).toBeTruthy();
});


it('should trigger props.onClick', () => {
    const onClick = jest.fn();
    const event = {
        target: {
            result: "[4]"
        }
    }
    const loadData = new LoadData({
        onClick
    });

    loadData.onClick(event);

    expect(onClick).toBeCalledWith([4]);
});
