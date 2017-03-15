import {
  SHOW_MESSAGE,
  HIDE_MESSAGE
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case SHOW_MESSAGE:
      return { ...state, content: action.payload.content, show: action.payload.show };
    case HIDE_MESSAGE:
      return { ...state, show: action.payload.show };
    default:
      return state;
  }
}
