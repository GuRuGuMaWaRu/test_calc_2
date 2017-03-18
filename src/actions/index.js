import { inputCheck, parseInput, beautifyInput } from '../utils/parsers';
import { calculationParser } from '../utils/calculation';
import {
  SET_INPUT,
  CLEAR_INPUT,
  SHOW_MESSAGE,
  HIDE_MESSAGE
} from './types';

export function deleteInput(parsedInput) {
  const updatedInput = parsedInput.slice(0, -1);
  //=== return updated input
  return {
    type: SET_INPUT,
    payload: {
      parsed: updatedInput,
      display: beautifyInput(updatedInput),
      result: calculationParser(updatedInput)
    }
  };
}

export function getInput(previousInput = '', currentInput) {
  const limitMessage = inputCheck(previousInput, currentInput);
  //=== don't do anything if any limit is triggered
  if (limitMessage.length > 0) {
    return {
      type: SHOW_MESSAGE,
      payload: {content: limitMessage, show: true}
    };
  }
  //=== check if CLEAR button is pressed
  if (currentInput === 'C') {
    return {
      type: CLEAR_INPUT
    };
  }
  //=== check if '=' button is pressed
  if (currentInput === '=') {
    return {
      type: SET_INPUT,
      payload: {
        parsed: calculationParser(previousInput),
        display: calculationParser(previousInput),
        result: ''
      }
    };
  }
  //=== parse input
  const parsedInput = parseInput(previousInput, currentInput);
  //=== return parsed input
  return {
    type: SET_INPUT,
    payload: {
      parsed: parsedInput,
      display: beautifyInput(parsedInput),
      result: calculationParser(parsedInput)
    }
  };
}

export function hideMessage() {
  return {
    type: HIDE_MESSAGE,
    payload: {show: false}
  };
}
