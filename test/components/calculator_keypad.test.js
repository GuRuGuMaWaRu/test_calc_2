import React from 'react';
import ReactDOM from 'react-dom';
import CalculatorKeypad from '../../src/components/calculator_display';

describe('CalculatorKeypad', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CalculatorKeypad />, div);
  });
});
