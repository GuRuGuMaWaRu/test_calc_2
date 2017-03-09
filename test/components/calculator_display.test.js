import React from 'react';
import { shallow } from 'enzyme';

import { CalculatorDisplay } from '../../src/components/calculator_display';

function setup() {
  const props = {
    setInput: jest.fn(),
    input: '12345'
  };

  const enzymeWrapper = shallow(<CalculatorDisplay {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('CalculatorDisplay', () => {
  let enzymeWrapper;

  beforeEach(() => {
    ({ enzymeWrapper } = setup());
  });

  it('renders without crashing', () => {
    expect(enzymeWrapper.hasClass('calculator-display')).toBe(true);
  });
  it('shows input field', () => {
    expect(enzymeWrapper.find('.calculator-display-input')).toBeTruthy();
  });
  it('shows result field', () => {
    expect(enzymeWrapper.find('.calculator-display-result')).toBeTruthy();
  });
});
