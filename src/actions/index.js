import {
  SET_INPUT
} from './types';

export function parseInput() {
  return {
    type: SET_INPUT,
    payload: '12345'
  };
}
