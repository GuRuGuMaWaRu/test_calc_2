import { inputCheck } from '../utils/parsers';
import {
  SET_INPUT,
  SHOW_MESSAGE
} from './types';

export function parseInput(key, previousInput = '') {
  const limit = inputCheck(key, previousInput);

  console.log(limit);

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
