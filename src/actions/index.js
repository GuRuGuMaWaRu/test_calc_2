import { inputCheck, parseInput, beautifyInput } from '../utils/parsers';
import { calculationParser } from '../utils/calculation';
import {
  SET_INPUT,
  SHOW_MESSAGE,
  HIDE_MESSAGE
} from './types';

export function sendInput(previousInput = '', currentInput) {
  const limitMessage = inputCheck(previousInput, currentInput);

  //=== don't do anything if there is am input problem
  if (limitMessage.length > 0) {
    return {
      type: SHOW_MESSAGE,
      payload: {content: limitMessage, show: true}
    };
  }

  //=== parse input
  const parsedInput = parseInput(previousInput, currentInput);

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
