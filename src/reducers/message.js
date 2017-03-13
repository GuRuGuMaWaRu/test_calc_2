import {
  SHOW_MESSAGE,
  CLEAR_MESSAGE
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case SHOW_MESSAGE:
      return { ...state, message: action.payload};
    case CLEAR_MESSAGE:
      return { ...state, message: ''};
  };
  return state;
}
