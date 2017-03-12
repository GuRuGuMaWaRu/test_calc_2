import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

export class CalculatorKeypad extends Component {
  render() {
    const keys = ['C', '()', '%', '/', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '.', '0', '+/-', '='],
          keypad = keys.map(key => {
            return (
              <div
                key={key}
                className='calculator-keypad-key'
                onClick={() => this.props.parseInput(key)}>{key}</div>
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
  input: PropTypes.string
}

function mapStateToProps(state) {
  return { input: state.input.unparsedInput }
}

export default connect(mapStateToProps, actions)(CalculatorKeypad);
