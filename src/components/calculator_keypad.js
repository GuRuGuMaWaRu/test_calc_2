import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { rippleEffect } from '../utils/visual';

export class CalculatorKeypad extends Component {
  componentWillUpdate() {
    window.removeEventListener('keyup', this.handleKeyboard);
  }

  ripple = (event) => {
    event.preventDefault();
    // 1 - setup
    let posX = event.target.offsetLeft,
      posY = event.target.offsetTop,
      posXMain = document.querySelector('.calculator-keypad-main').offsetLeft,
      posYMain = document.querySelector('.calculator-keypad-main').offsetTop,
      buttonWidth = event.target.offsetWidth,
      buttonHeight = event.target.offsetHeight;
    // 2 - remove any old ripple element
    // if (document.querySelector('.ripple')) {
    //   document.querySelector('.ripple').parentNode.removeChild('.ripple');
    // }
    // 3 - add new ripple element
    let newRipple = document.createElement('span');
    newRipple.classList.add('ripple');
    event.target.appendChild(newRipple);
    // 4 - make it round
    if (buttonWidth >= buttonHeight) {
      buttonHeight = buttonWidth;
    } else {
      buttonWidth = buttonHeight;
    }
    // 5 - get the center of the element
    var x = event.clientX - (posX + posXMain) - buttonHeight / 2;
    var y = event.clientY - posYMain - buttonHeight / 2;
    // 6 - add ripples CSS and start animation
    document.querySelector('.ripple').classList.add('yellow');

    let rippleElement = document.querySelector('.ripple');
    rippleElement.style.width = buttonWidth;
    rippleElement.style.height = buttonHeight;

    // $(".ripple").css({
    //   width: buttonWidth,
    //   height: buttonHeight,
    //   top: y + 'px',
    //   left: x + 'px'
    // }).addClass("rippleEffect");
  }

  handleKeyboard = (event) => {
    this.ripple(event);
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
