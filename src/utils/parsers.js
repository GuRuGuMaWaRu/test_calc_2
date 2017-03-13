const maxOperatorNumber = (previousInput) => {
  const operators = previousInput.match(/[\/\+\-\*]/g);
  return operators && operators.length === 20;
}

const maxNumberLength = (previousInput) => {
  const lastNumberLength = /(?:[\/\+\-\*\(])?([\d\.]+)$/.exec(previousInput);
  return lastNumberLength && lastNumberLength[1].length === 15;
}

const maxDecimalDotLength = (previousInput) => {
  const afterDecimalDot = /\.(\d+)$/.exec(previousInput);
  return afterDecimalDot && afterDecimalDot[1].length === 10;
}

const maxCharacterNumber = (previousInput) => {
  return previousInput.length === 100;
}

export const inputCheck = (value, previousInput) => {
  let result = {limit: false, message: ''};
  if (maxCharacterNumber(previousInput)) {
    result = {limit: true, message: 'Maximum number of characters reached: 100'};
  } else if (/[\d\.]/.test(value) && maxNumberLength(previousInput)) {
    result = {limit: true, message: 'Maximum number of characters in a number: 15'};
  } else if (/[\/\+\-\*]/.test(value) && maxOperatorNumber(previousInput)) {
    result = {limit: true, message: 'Maximum number of operators: 20'};
  } else if (/\d/.test(value) && maxDecimalDotLength(previousInput)) {
    result = {limit: true, message: 'Maximum number of digits after decimal dot: 10'};
  }
  return result;
}
