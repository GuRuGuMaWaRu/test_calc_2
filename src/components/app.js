import React, { Component } from 'react';

import CalculatorDisplay from './calculator_display';
import CalculatorKeypad from './calculator_keypad';

export default class App extends Component {
  render() {
    return (
      <div>
        <CalculatorDisplay />
        <CalculatorKeypad />
      </div>
    );
  }
}
