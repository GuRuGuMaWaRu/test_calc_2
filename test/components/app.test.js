import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import App from '../../src/components/app';
import CalculatorDisplay from '../../src/components/calculator_display';
import CalculatorKeypad from '../../src/components/calculator_display';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
  it('shows display', () => {
    expect(wrapper.find(CalculatorDisplay)).toBeTruthy();
  });
  it('shows keypad', () => {
    expect(wrapper.find(CalculatorKeypad)).toBeTruthy();
  });
});
