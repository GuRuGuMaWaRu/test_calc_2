import inputReducer from '../../src/reducers/input';
import { SET_INPUT } from '../../src/actions/types';

describe('Input Reducer', () => {
  it('handles action with unknown type', () => {
    expect(inputReducer(undefined, {})).toEqual({parsed: '', display: '', result: '', message: ''});
  });
  it('handles action of type SET_INPUT', () => {
    const action = {type: SET_INPUT, payload: { parsed: '12334', display: '12334', result: '12334', message: '' }};
    expect(inputReducer({}, action)).toEqual({ parsed: '12334', display: '12334', result: '12334', message: '' });
  });
});
