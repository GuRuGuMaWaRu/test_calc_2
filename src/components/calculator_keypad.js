import React, { Component } from 'react';

export default class CalculatorKeypad extends Component {
  render() {
    const keys = ['C', '()', '%', '/', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '.', '0', '+/-', '='],
          keypad = keys.map(key => <div key={key} className='calculator-keypad-keypad-key'>{key}</div>);
    return (
      <div className='calculator-keypad'>
        <div className='calculator-keypad-pan'></div>
        <div className='calculator-keypad-keypad'>{keypad}</div>
        <div className='calculator-keypad-pan'></div>
      </div>
    );
  }
}
