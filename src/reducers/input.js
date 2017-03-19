import {
  SET_INPUT,
  CLEAR_INPUT
 } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case SET_INPUT:
      return {
        parsed: action.payload.parsed,
        display: action.payload.display,
        result: action.payload.result
      };
    case CLEAR_INPUT:
      return {
        parsed: '',
        display: '',
        result: ''
      };
    default:
      return state;
  }
}
