import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
    shallow
} from 'enzyme';

it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    //  const div = document.createElement('div');
    //  ReactDOM.render(<App />, div);
});
