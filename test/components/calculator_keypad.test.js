import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import CalculatorKeypad from '../../src/components/calculator_keypad';

describe('CalculatorKeypad', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CalculatorKeypad />);
  });

  it.skip('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CalculatorKeypad />, div);
  });
  it.skip('shows 21 buttons', () => {
    expect(wrapper.find('div').length).toBe(21);
  });
});
