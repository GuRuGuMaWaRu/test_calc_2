import React from 'react';
import ReactDOM from 'react-dom';
import CalculatorDisplay from '../../src/components/calculator_display';

describe('CalculatorDisplay', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CalculatorDisplay />, div);
  });
});
