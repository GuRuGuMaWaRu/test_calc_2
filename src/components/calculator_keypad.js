import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { rippleEffect } from '../utils/visual';
import { parseKeyboardInput } from '../utils/parsers';

export class CalculatorKeypad extends Component {
  componentWillUpdate() {
    window.removeEventListener('keyup', this.handleKeyboard);
  }

  handleKeyboard = (event) => {
    const keyName = parseKeyboardInput(event);

    if (keyName) {
      if (keyName !== 'delete') {
        const pressedElement = document.querySelector(`[data-key="${keyName}"]`);

        // pressedElement.classList.add('keypad-key-active');
        // setTimeout(function () {
        //     pressedElement.classList.remove('keypad-key-active');
        // }, 150);

        rippleEffect(event, true, pressedElement);
      }
      this.props.handleInput(event, true, this.props.parsedInput, keyName);
    }
  }

  handleMouseAndTouch = (event, parsedInput, key) => {
    rippleEffect(event, false, null);
    this.props.handleInput(event, false, parsedInput, key);
  }

  render() {
    const keys = ['C', '()', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '.', '0', '+/-', '='];
    const parsedInput = this.props.parsedInput;
    //== create keypad
    const keypad = keys.map(key => {
      //== set different colors for operator buttons & equality button
      let outerRow = /^(C|\(\)|%|\/|\*|\+|\-)$/.test(key) ? 'outer-row' : '';
      outerRow = /=/.test(key) ? 'equality' : outerRow;

      return (
        <div key={key}
          className={`keypad-key ${outerRow}`}
          onClick={(event) => this.handleMouseAndTouch(event, parsedInput, key)}
          data-key={key}
          data-rippleEffect="button">
          {key}
        </div>
      )});

    //== listen for keyboard input
    window.addEventListener('keyup', this.handleKeyboard);

    return (
      <div className='keypad'>
        <div className='keypad-additional'>
          <span
            onClick={(event) => this.props.handleInput(event, false, parsedInput, 'delete')}
            className='glyphicon glyphicon-arrow-left padding keypad-delete'
            value='delete'></span>
        </div>
        <div className='keypad-main'>
          { keypad }
        </div>
        <span className="ripple"></span>
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
