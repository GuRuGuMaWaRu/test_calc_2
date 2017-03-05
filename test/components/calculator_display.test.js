import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import CalculatorDisplay from '../../src/components/calculator_display';

describe('CalculatorDisplay', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CalculatorDisplay />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CalculatorDisplay />, div);
  });
  it('shows input field', () => {
    expect(wrapper.find('.calculator-display-input')).toBeTruthy();
  });
  it('shows result field', () => {
    expect(wrapper.find('.calculator-display-result')).toBeTruthy();
  });
});
