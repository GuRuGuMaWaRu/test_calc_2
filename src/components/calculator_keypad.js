import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { rippleEffect } from '../utils/visual';

export class CalculatorKeypad extends Component {
  componentWillUpdate() {
    window.removeEventListener('keyup', this.handleKeyboard);
  }

  ripple = (event, key) => {
    const buttonWidth = event.target.offsetWidth,
          buttonHeight = event.target.offsetHeight,
          rippleElement = document.querySelector('.ripple');

    const rippleSize = buttonWidth > buttonHeight ? buttonWidth : buttonHeight,
          rippleX = event.clientX - rippleSize / 2,
          rippleY = event.clientY - rippleSize / 2;

    console.log(event.currentTarget);

    rippleElement.setAttribute('style',
      `width: ${rippleSize}px; height: ${rippleSize}px;
      top: ${rippleY}px; left: ${rippleX}px`);

    rippleElement.classList.add('ripple-effect');

    window.setTimeout(() => {
      rippleElement.setAttribute('style',
        `width: 0; height: 0;
        opacity: 1`);
      rippleElement.classList.remove('ripple-effect');
    }, 400);
  }

  handleKeyboard = (event) => {
    // this.ripple(event);
    this.props.handleInput(event, true, this.props.parsedInput, '');
  }

  handleMouseAndTouch = (event, parsedInput, key) => {
    this.ripple(event, key);
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
        <div key={key} className={`keypad-key ${outerRow}`}
          onClick={(event) => this.handleMouseAndTouch(event, parsedInput, key)}>
          {key}
        </div>
      )});

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
