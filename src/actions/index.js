import {
  SET_INPUT
} from './types';

export function setInput() {
  return {
    type: SET_INPUT,
    payload: '12345'
  };
}
