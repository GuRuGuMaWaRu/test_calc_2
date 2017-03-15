import { SET_INPUT } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case SET_INPUT:
      return { ...state, parsed: action.payload.parsed, display: action.payload.display };
    default:
      return state;
  }
}
