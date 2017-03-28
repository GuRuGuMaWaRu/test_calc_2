import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { rippleEffect } from '../utils/visual';

export class CalculatorKeypad extends Component {
  componentWillUpdate() {
    window.removeEventListener('keyup', this.handleKeyboard);
  }

  ripple = (event, key) => {
    // Getting the div that the effect is relative to
    var box = event.target,
        // Creating the effect's div
        create = document.createElement('div'),
        // Getting the button's size, distance to top and left
        boxWidth = box.offsetWidth,
        boxHeight = box.offsetHeight,
        boxY = box.getBoundingClientRect().top,
        boxX = box.getBoundingClientRect().left,
        // Getting the mouse position
        mouseX = event.clientX,
        mouseY = event.clientY,
        // Mouse position relative to the box
        rippleX = mouseX - boxX,
        rippleY = mouseY - boxY,
        // Calculate which is the farthest corner
        rippleWidth = boxWidth / 2 < rippleX
                        ? rippleX
                        : boxWidth - rippleX,
        rippleHeight = boxHeight / 2 < rippleY
                        ? rippleY
                        : boxHeight - rippleY,
        // Distance to the farthest corner
        boxSize = Math.sqrt(Math.pow(rippleWidth, 2) +
                            Math.pow(rippleHeight, 2));

    // Creating and moving the effect div inside the button
    box.appendChild(create);

    // Ripple style (size, position, color and border-radius)
    create.setAttribute('data-rippleEffect', 'effect');
    create.style.height = 2 * boxSize + 'px';
    create.style.width = 2 * boxSize + 'px';
    create.style.top = mouseY - boxY - boxSize + 'px';
    create.style.left = mouseX - boxX - boxSize + 'px';

    setTimeout(function () {
        box.removeChild(create);
    }, 800);
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
        <div key={key}
          className={`keypad-key ${outerRow}`}
          onClick={(event) => this.handleMouseAndTouch(event, parsedInput, key)}
          data-rippleEffect="button">
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
