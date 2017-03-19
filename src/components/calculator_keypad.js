import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

export class CalculatorKeypad extends Component {
  render() {
    const keys = ['C', '()', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '.', '0', '+/-', '='];
    const parsedInput = this.props.parsedInput;
    const keypad = keys.map(key => {
            return (
              <div key={key} className='calculator-keypad-key unselectable'
                onClick={(event) => this.props.handleInput(event, false, parsedInput, key)}>
                {key}
              </div>
            )});

    addEventListener('keyup', (event) => this.props.handleInput(event, true, parsedInput));

    return (
      <div className='calculator-keypad'>
        <div className='calculator-keypad-additional'>
          <span
            onClick={(event) => this.props.handleInput(event, false, parsedInput, 'delete')}
            className='glyphicon glyphicon-arrow-left padding calculator-keypad-delete'
            value='delete'></span>
        </div>
        <div className='calculator-keypad-main'>
          { keypad }
        </div>
      </div>
    );
  }
}

CalculatorKeypad.propTypes = {
  handleInput: PropTypes.func,
  getInput: PropTypes.func,
  deleteInput: PropTypes.func,
  handleKeyboardInput: PropTypes.func,
  parsedInput: PropTypes.string
}

function mapStateToProps(state) {
  return { parsedInput: state.input.parsed }
}

export default connect(mapStateToProps, actions)(CalculatorKeypad);
