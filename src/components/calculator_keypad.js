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
                onClick={() => this.props.sendInput(this.props.parsedInput, key)}>{key}</div>
            )});

    return (
      <div>
        <div className='calculator-keypad-additional'>
          <span onClick={() => this.props.deleteInput(this.props.parsedInput)}
            className='glyphicon glyphicon-arrow-left padding calculator-keypad-delete'></span>
        </div>
        <div className='calculator-keypad'>
          { keypad }
        </div>
      </div>
    );
  }
}

CalculatorKeypad.propTypes = {
  deleteInput: PropTypes.func,
  previousInput: PropTypes.string,
  parsedInput: PropTypes.string
}

function mapStateToProps(state) {
  return { parsedInput: state.input.parsed }
}

export default connect(mapStateToProps, actions)(CalculatorKeypad);
