import {
  inputCheck,
  parseInput,
  beautifyInput,
  beautifyResult
} from '../utils/parsers';
import { calculationParser } from '../utils/calculation';
import {
  SET_INPUT,
  CLEAR_INPUT,
  SHOW_MESSAGE,
  HIDE_MESSAGE
} from './types';

export function handleInput(parsedInput, currentInput) {
  // check input
  const checked = inputCheck(parsedInput, currentInput);

  // handle DELETE action
  if (currentInput === 'delete') {
    const updatedInput = parsedInput.slice(0, -1);
    return {
      type: SET_INPUT,
      payload: {
        parsed: updatedInput,
        display: beautifyInput(updatedInput),
        result: checked.result ? beautifyResult(calculationParser(updatedInput)) : '',
        message: checked.message
      }
    };
  }
  //=== handle CLEAR action
  if (currentInput === 'C') {
    return {
      type: CLEAR_INPUT
    };
  }
  //=== handle '=' acttion
  if (currentInput === '=') {
    return {
      type: SET_INPUT,
      payload: {
        parsed: calculationParser(parsedInput),
        display: beautifyResult(calculationParser(parsedInput)),
        result: ''
      }
    };
  }
  // // handle any limits
  // const checked = inputCheck(parsedInput, currentInput);
  //
  // if (checked.message.length > 0) {
  //   return {
  //     type: SHOW_MESSAGE,
  //     payload: checked.message
  //   };
  // }

  // handle CALCULATION
  const updatedInput = parseInput(parsedInput, currentInput);
  return {
    type: SET_INPUT,
    payload: {
      parsed: updatedInput,
      display: beautifyInput(updatedInput),
      result: beautifyResult(calculationParser(updatedInput))
    }
  };
}

export function hideMessage() {
  return {
    type: HIDE_MESSAGE
  };
}
