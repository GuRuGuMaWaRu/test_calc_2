import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { rippleEffect } from '../utils/visual';

export class CalculatorKeypad extends Component {
  componentWillUpdate() {
    window.removeEventListener('keyup', this.handleKeyboard);
  }

  ripple = (event) => {
    const buttonWidth = event.target.offsetWidth,
          buttonHeight = event.target.offsetHeight,
          rippleElement = document.querySelector('.ripple');

    const rippleSize = buttonWidth > buttonHeight ? buttonWidth : buttonHeight,
          rippleX = event.clientX - rippleSize / 2,
          rippleY = event.clientY - rippleSize / 2;
    //== activate ripple element
    // rippleElement.classList.remove('ripple-inactive');
    //== add ripple CSS and start animation
    rippleElement.setAttribute('style',
      `width: ${rippleSize}px; height: ${rippleSize}px;
      top: ${rippleY}px; left: ${rippleX}px`);

    rippleElement.classList.add('ripple-effect');

    window.setTimeout(() => {
      rippleElement.setAttribute('style',
        `width: 0; height: 0; opacity: 1`);
      rippleElement.classList.remove('ripple-effect');
    }, 400);
  }

  handleKeyboard = (event) => {
    // this.ripple(event);
    this.props.handleInput(event, true, this.props.parsedInput, '');
  }

  handleMouseAndTouch = (event, parsedInput, key) => {
    this.ripple(event);
    this.props.handleInput(event, false, parsedInput, key);
  }

  render() {
    const keys = ['C', '()', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '.', '0', '+/-', '='];
    const parsedInput = this.props.parsedInput;
    const keypad = keys.map(key => {
      //== set different colors for operator buttons & equality button
      let outerRow = /^(C|\(\)|%|\/|\*|\+|\-)$/.test(key) ? 'outer-row' : '';
      outerRow = /=/.test(key) ? 'equality' : outerRow;
      //== create keypad
      return (
        <div key={key} className={`calculator-keypad-key unselectable ${outerRow}`}
          onClick={(event) => this.handleMouseAndTouch(event, parsedInput, key)}>
          {key}
        </div>
      )});

    window.addEventListener('keyup', this.handleKeyboard);

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
        <div className="ripple"></div>
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
