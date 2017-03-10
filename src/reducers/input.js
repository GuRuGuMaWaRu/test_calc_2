import { SET_INPUT } from '../actions/types';

export default function(state = '', action) {
  switch(action.type) {
    case SET_INPUT:
      return action.payload;
  }
  return state;
}
