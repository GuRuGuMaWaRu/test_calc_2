import {
  inputCheck,
  parseInput,
  beautifyInput,
  beautifyResult
} from '../utils/parsers';
import { calculationParser } from '../utils/calculation';
import {
  UPDATE_INPUT,
  CLEAR_INPUT,
  HIDE_MESSAGE,
  ERROR_MESSAGE
} from './types';

export function handleInput(parsedInput, currentInput) {
  //=== check input
  const message = inputCheck(parsedInput, currentInput);

  //=== handle DELETE action
  if (currentInput === 'delete') {
    const updatedInput = parsedInput.slice(0, -1);

    if (message) {
      return {
        type: ERROR_MESSAGE,
        payload: {
          parsed: updatedInput,
          display: beautifyInput(updatedInput),
          result: '',
          message: message.content
        }
      };
    } else {
      return {
        type: UPDATE_INPUT,
        payload: {
          parsed: updatedInput,
          display: beautifyInput(updatedInput),
          result: beautifyResult(calculationParser(updatedInput))
        }
      };
    }
  }

  //=== handle CLEAR action
  if (currentInput === 'C') {
    return {
      type: CLEAR_INPUT
    };
  }

  //=== handle EQUALITY action
  if (currentInput === '=') {
    if (message) {
      return {
        type: ERROR_MESSAGE,
        payload: {
          parsed: parsedInput,
          display: beautifyInput(parsedInput),
          result: '',
          message: message.content
        }
      }
    } else {
      return {
        type: UPDATE_INPUT,
        payload: {
          parsed: calculationParser(parsedInput),
          display: beautifyResult(calculationParser(parsedInput)),
          result: ''
        }
      };
    }
  }

  //=== handle CALCULATION
  const updatedInput = parseInput(parsedInput, currentInput);

  if (message && message.type === 'medium') {
    console.log('medium');
    return {
      type: ERROR_MESSAGE,
      payload: {
        parsed: updatedInput,
        display: beautifyInput(updatedInput),
        result: '',
        message: message.content
      }
    };
  } else if (message && message.type === 'serious') {
    console.log('serious');
    return {
      type: ERROR_MESSAGE,
      payload: {
        parsed: parsedInput,
        display: beautifyInput(parsedInput),
        result: '',
        message: message.content
      }
    };
  } else {
    return {
      type: UPDATE_INPUT,
      payload: {
        parsed: updatedInput,
        display: beautifyInput(updatedInput),
        result: beautifyResult(calculationParser(updatedInput))
      }
    };
  }
}

export function hideMessage() {
  return {
    type: HIDE_MESSAGE
  };
}
