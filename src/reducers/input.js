import {
  SET_INPUT,
  CLEAR_INPUT,
  HIDE_MESSAGE
 } from '../actions/types';

export default function(state = {parsed: '', display: '', result: '', message: ''}, action) {
  switch(action.type) {
    case SET_INPUT:
      return {
        parsed: action.payload.parsed,
        display: action.payload.display,
        result: action.payload.result,
        message: action.payload.message
      };
    case CLEAR_INPUT:
      return {
        parsed: '',
        display: '',
        result: '',
        message: ''
      };
    // case HIDE_MESSAGE:
    //   return {
    //     message: ''
    //   };
    default:
      return state;
  }
}
