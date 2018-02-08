import React from 'react';
import ReactDOM from 'react-dom';
import './setup.js';
//import { mount } from 'enzyme';
import { mount } from './enzyme-ext';

it('can click', () => {
    const handler = jest.fn();
    const wrapper = mount(<button onClick={handler}/>);

    //wrapper.simulate('click');
    wrapper.click();

    expect(handler).toHaveBeenCalled();
});

describe('find', () => {
    it('returns proxy', () => {
        const handler = jest.fn();
        const wrapper = mount(<div><button onClick={handler}/></div>);
        const buttonWrapper = wrapper.find('button');

        buttonWrapper.click();
    
        expect(handler).toHaveBeenCalled();
    });
});
