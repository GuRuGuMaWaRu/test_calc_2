import { inputCheck, parseInput, beautifyInput, beautifyResult } from '../utils/parsers';
import { calculationParser } from '../utils/calculation';
import {
  SET_INPUT,
  CLEAR_INPUT,
  SHOW_MESSAGE,
  HIDE_MESSAGE
} from './types';

function parseKeyboardInput(event) {
  const simpleValues = {
    48: '0', 49: '1', 50: '2', 51: '3', 52: '4',
    53: '5', 54: '6', 55: '7', 56: '8', 57: '9',
    67: 'C', 187: '=', 189: '-', 190: '.', 191: '/'
  };
  const complexValues = {
    48: '()', 53: '%', 56: '*', 57: '()', 67: 'C', 187: '+'
  };
  const pressedKey = event.keyCode;

  if (event.shiftKey && complexValues.hasOwnProperty(pressedKey)) {
    return complexValues[pressedKey];
  } else if (simpleValues.hasOwnProperty(pressedKey)) {
    return simpleValues[pressedKey];
  }
}

export function handleInput(event, keyboardInput, parsedInput = '', currentInput) {
  // handle keyboard input
  if (keyboardInput) {
    currentInput = parseKeyboardInput(event);
  }
  // handle DELETE action
  if (currentInput === 'delete') {
    const updatedInput = parsedInput.slice(0, -1);
    return {
      type: SET_INPUT,
      payload: {
        parsed: updatedInput,
        display: beautifyInput(updatedInput),
        result: beautifyResult(calculationParser(updatedInput))
      }
    };
  }
  // handle any limits
  const limitMessage = inputCheck(parsedInput, currentInput);
  if (limitMessage.length > 0) {
    return {
      type: SHOW_MESSAGE,
      payload: {
        content: limitMessage,
        show: true
      }
    };
  }
  //=== handle CLEAR action
  if (currentInput === 'C') {
    return {
      type: CLEAR_INPUT
    };
  }
  //=== handle '=' acttion
  if (currentInput === '=') {
    return {
      type: SET_INPUT,
      payload: {
        parsed: calculationParser(parsedInput),
        display: beautifyResult(calculationParser(parsedInput)),
        result: ''
      }
    };
  }
  // handle CALCULATION action
  const updatedInput = parseInput(parsedInput, currentInput);
  return {
    type: SET_INPUT,
    payload: {
      parsed: updatedInput,
      display: beautifyInput(updatedInput),
      result: beautifyResult(calculationParser(updatedInput))
    }
  };
}

export function hideMessage() {
  return {
    type: HIDE_MESSAGE,
    payload: {show: false}
  };
}
