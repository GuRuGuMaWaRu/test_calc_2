import { inputCheck, parseInput } from '../utils/parsers';
import {
  SET_INPUT,
  SHOW_MESSAGE,
  HIDE_MESSAGE
} from './types';

export function sendInput(previousInput = '', currentInput) {
  const limitMessage = inputCheck(previousInput, currentInput);

  if (limitMessage.length > 0) {
    return {
      type: SHOW_MESSAGE,
      payload: {content: limitMessage, show: true}
    };
  } else {
    const parsedInput = parseInput(previousInput, currentInput)
    return {
      type: SET_INPUT,
      payload: parsedInput
    };
  }
}

export function hideMessage() {
  return {
    type: HIDE_MESSAGE,
    payload: {show: false}
  };
}
