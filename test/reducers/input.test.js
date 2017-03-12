import inputReducer from '../../src/reducers/input';
import { SET_INPUT } from '../../src/actions/types';

describe('Input Reducer', () => {
  it('handles action with unknown type', () => {
    expect(inputReducer(undefined, {})).toEqual({});
  });
  it('handles action of type SET_INPUT', () => {
    const action = {type: SET_INPUT, payload: '12334'};
    expect(inputReducer({}, action)).toEqual({unparsedInput: '12334'});
  });
});
