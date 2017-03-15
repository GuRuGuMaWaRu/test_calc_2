import { inputCheck } from '../utils/parsers';
import {
  SET_INPUT,
  SHOW_MESSAGE,
  HIDE_MESSAGE
} from './types';

export function parseInput(key, previousInput = '') {
  const limitMessage = inputCheck(key, previousInput);

  if (limitMessage.length > 0) {
    return {
      type: SHOW_MESSAGE,
      payload: {content: limitMessage, show: true}
    };
  } else {
    return {
      type: SET_INPUT,
      payload: previousInput + key
    };
  }
}

export function hideMessage() {
  return {
    type: HIDE_MESSAGE,
    payload: {show: false}
  };
}
