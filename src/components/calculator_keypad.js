import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CalculatorKeypad extends Component {
  render() {
    const keys = ['C', '()', '%', '/', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '.', '0', '+/-', '='],
          keypad = keys.map(key => <div key={key} className='calculator-keypad-key'>{ key }</div>);
    return (
      <div className='calculator-keypad'>
        { keypad }
      </div>
    );
  }
}

CalculatorKeypad.propTypes = {
  parseInput: PropTypes.func.isRequired,
  input: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  return { input: state.input }
}

export default connect(mapStateToProps, actions)(CalculatorKeypad);
