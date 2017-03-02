import React, { Component } from 'react';

export default class CalculatorKeypad extends Component {
  render() {
    return (
      <div className='calculator-keypad'>
        <div className='calculator-keypad-pan'></div>
        <div className='calculator-keypad-keypad'>Keypad</div>
        <div className='calculator-keypad-pan'></div>
      </div>
    );
  }
}
