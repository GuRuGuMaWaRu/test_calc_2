import { inputCheck } from '../utils/parsers';
import {
  SET_INPUT
} from './types';

export function parseInput(key, previousInput = '') {
  const limit = inputCheck(key, previousInput);
  console.log(limit);
  return {
    type: SET_INPUT,
    payload: previousInput + key
  };
}
