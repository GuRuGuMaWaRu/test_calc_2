import { inputCheck } from '../utils/parsers';
import {
  SET_INPUT,
  SHOW_MESSAGE,
  CLEAR_MESSAGE
} from './types';

export function parseInput(key, previousInput = '') {
  const limit = inputCheck(key, previousInput);

  if (limit.limit) {
    return {
      type: SHOW_MESSAGE,
      payload: limit.message
    };
  } else {
    return {
      type: SET_INPUT,
      payload: previousInput + key
    };
  }
}

export function clearMessage() {
  return {
    type: CLEAR_MESSAGE,
    payload: ''
  };
}
