import React from 'react';
import './setup.js';
import { mount, shallow, render, } from 'enzyme';

function App(props) {
    return (
        <div>
            <script type="text/html" id="store" dangerouslySetInnerHTML={{__html: "HELLO"}}></script>
        </div>
    );
}

describe('enzyme', () => {
    it('render doesn\'t render html', () => {
        expect(render(<App />).find('#store').text()).toBe('');
    });

    it('mount renders html', () => {
        expect(mount(<App />).find('#store').text()).not.toBe('');
    });
    it('shallow doesn\'t render html', () => {
        expect(shallow(<App />).find('#store').text()).toBe('');
    });
});
