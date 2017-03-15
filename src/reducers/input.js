import { SET_INPUT } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case SET_INPUT:
      return { ...state, unparsedInput: action.payload };
    default:
      return state;
  }
}
