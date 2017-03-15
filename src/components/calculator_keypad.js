import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

export class CalculatorKeypad extends Component {
  render() {
    const keys = ['C', '()', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '.', '0', '+/-', '='],
          keypad = keys.map(key => {
            return (
              <div
                key={key}
                className='calculator-keypad-key unselectable'
                onClick={() => this.props.sendInput(this.props.previousInput, key)}>{key}</div>
            )});
    return (
      <div className='calculator-keypad'>
        { keypad }
      </div>
    );
  }
}

CalculatorKeypad.propTypes = {
  parseInput: PropTypes.func,
  previousInput: PropTypes.string
}

function mapStateToProps(state) {
  return { previousInput: state.input.parsed }
}

export default connect(mapStateToProps, actions)(CalculatorKeypad);
