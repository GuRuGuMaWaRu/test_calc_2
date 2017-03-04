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
    const inputField = <div className="calculator-display-input">Input</div>;
    expect(wrapper.contains(inputField)).toEqual(true);
  });
  it('shows result field', () => {
    const resultField = <div className="calculator-display-result">Result</div>;
    expect(wrapper.contains(resultField)).toEqual(true);
  });
});
