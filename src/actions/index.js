import {
  SET_INPUT
} from './types';

export function parseInput(key) {
  console.log(key);
  return {
    type: SET_INPUT,
    payload: '12345'
  };
}
