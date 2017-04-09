export const maxOperatorNumber = (previousInput) => {
  const operators = previousInput.match(/[\/\+\-\*]/g);
  return operators && operators.length === 20;
}

export const maxNumberLength = (previousInput) => {
  const lastNumberLength = /(?:[\/\+\-\*\(])?([\d\.]+)$/.exec(previousInput);
  return lastNumberLength && lastNumberLength[1].length === 15;
}

export const maxDecimalDotLength = (previousInput) => {
  const afterDecimalDot = /\.(\d+)$/.exec(previousInput);
  return afterDecimalDot && afterDecimalDot[1].length === 10;
}

export const maxCharacterNumber = (previousInput) => {
  return previousInput.length === 100;
}

export const inputCheck = (previousInput, currentInput) => {
  if (maxCharacterNumber(previousInput)) {
    return {type: 'serious', content: 'Maximum number of characters reached: 100'};
  } else if (/[\d\.]/.test(currentInput) && maxNumberLength(previousInput)) {
    return {type: 'serious', content: 'Maximum number of characters in a number: 15'};
  } else if (/[\/\+\-\*]/.test(currentInput) && maxOperatorNumber(previousInput)) {
    return {type: 'serious', content: 'Maximum number of operators: 20'};
  } else if (/\d/.test(currentInput) && maxDecimalDotLength(previousInput)) {
    return {type: 'serious', content: 'Maximum number of digits after decimal dot: 10'};
  } else if (/[0\.]/.test(currentInput) && /[\/0]$/.test(previousInput)) {
    return {type: 'medium', content: 'Can\'t divide by zero'};
  } else if (/=/.test(currentInput) && /\/(0(\.)?[\/\+\-\*]|0$)/.test(previousInput)) {
    return {type: 'medium', content: 'Can\'t divide by zero'};
  } else if (/delete/.test(currentInput) && /\/(0|0\.)$/.test(previousInput.slice(0, -1))) {
    return {type: 'medium', content: 'Can\'t divide by zero'};
  }
  return '';
}

export const parseInput = (previousInput, currentInput) => {
  const handlers = [
    //== '+/-' input
    {
      value: /\+\/\-/,
      test: /\(\-(\d+)?\+\/\-$/, //=== remove a negative sign
      convert: '$1'
    },
    {
      value: /\+\/\-/,
      test: /([\)%])\+\/\-/, //=== add "*(-" after "%" and closing bracket
      convert: '$1*(-'
    },
    {
      value: /\+\/\-/,
      test: /(\d+)?\+\/\-$/, //=== add a negative sign
      convert: '(-$1'
    },
    //==
    {
      value: /\d/,
      test: /(^|[\/\+\-\*\(])0(\d)/, //=== solve leading zero issue
      convert: '$1$2'
    },
    {
      value: /\./,
      test: /(\))(\.)/, //=== turn ")" into ")*0." when "." is entered
      convert: '$1*0$2'
    },
    {
      value: /\./,
      test: /(^|[\/\+\-\*])(\.)/, //=== insert zero before leading decimal dot
      convert: '$10$2'
    },
    {
      value: /\./,
      test: /\b(\d+\.)(\d+)?(\.)/, //=== solve duplicate decimal dot issue
      convert: '$1$2'
    },
    {
      value: /[\/\+\-\*]/,
      test: /^[\/\+\-\*]/, //=== solve leading operator issue
      convert: ''
    },
    {
      value: /[\/\+\-\*]/,
      test: /[\/\+\-\*](?=[\/\+\-\*])/, //=== solve consecutive operators issue
      convert: ''
    },
    {
      value: /[\/\+\*]/,
      test: /(\()[\/\+\*]/, //=== solve "(+", "(*", and "(/" issue
      convert: '$1'
    },
    {
      value: /\(\)/,
      test: /^(\(+)?\)/, //=== solve leading brackets issue
      convert: '$1'
    },
    {
      value: /\(\)/,
      test: /([\/\+\-\*\(])\(\)/, //=== solve 'opening bracket after an operator/opening bracker' issue
      convert: '$1('
    },
    {
      value: /[\d]/,
      test: /(\))(\d)/, //=== add multiplication operator before a number that follows closing bracket
      convert: '$1*$2'
    },
    //== percent handlers
    {
      value: /%/,
      test: /([\/\+\-\*\(%])%/, //=== cases when percent sign is not entered
      convert: '$1'
    },
    {
      value: /%/,
      test: /^%/, //=== forbid percent character as the first character
      convert: ''
    },
    {
      value: /\d/,
      test: /%(\d)/, //=== forbid percent character as the first character
      convert: '%*$1'
    },
    {
      value: /\./,
      test: /%\./, //=== solve duplicate decimal dot issue
      convert: '%*0.'
    },
  ];

  // add handlers depending on the number of opening/closing brackets
  if (currentInput === '()') {
    const openingBrackets = previousInput.match(/\(/g),
          closingBrackets = previousInput.match(/\)/g),
          openingBracketsNr = openingBrackets ? openingBrackets.length : 0,
          closingBracketsNr = closingBrackets ? closingBrackets.length : 0;
    if (openingBracketsNr > closingBracketsNr) {
      handlers.push({
        value: /\(\)/,
        test: /([\d\.\)%])\(\)/,
        convert: '$1)'
      });
    } else {
      handlers.push({
        value: /\(\)/,
        test: /([\d\.\)%])\(\)/,
        convert: '$1*('
      });
    }
  }

  const chosenHandlers = handlers.filter(handler => {
    let regexp = handler.value;
    return regexp.test(currentInput);
  });

  //=== run accumulated input through all parser functions
  return chosenHandlers.reduce((a, b) => {
    return a.replace(b.test, b.convert);
  }, previousInput + currentInput);
}

export const beautifyInput = (input) => {
  function replaceNumber(_match, number) {
    // solve issue when toLocaleString deletes decimal dot if it's the last symbol
    if (input.indexOf('e') !== -1) {
      return number;
    } else if (number.endsWith('.')) {
      number = Number(number);
      return (number.toLocaleString('en-US', {maximumFractionDigits: 10})) + '.';
    } else {
      number = Number(number);
      return number.toLocaleString('en-US', {maximumFractionDigits: 10});
    }
  }
  return input.replace(/([\d\.]+)/g, replaceNumber);
}

export const beautifyResult = (input) => {
  if (input.indexOf('e') !== -1) {
    return input;
  } else {
    const inputIntoNumber = Number(input);
    return inputIntoNumber.toLocaleString('en-US', {maximumFractionDigits: 10});
  }
}

export const getKeyName = (event) => {
  const simpleValues = {
    8: 'delete', 13: '=',
    48: '0', 49: '1', 50: '2', 51: '3', 52: '4',
    53: '5', 54: '6', 55: '7', 56: '8', 57: '9',
    67: 'C', 187: '=', 189: '-', 190: '.', 191: '/'
  };
  const complexValues = {
    48: '()', 53: '%', 56: '*', 57: '()', 67: 'C', 187: '+'
  };
  const pressedKey = event.keyCode;

  if (event.shiftKey && complexValues.hasOwnProperty(pressedKey)) {
    return complexValues[pressedKey];
  } else if (simpleValues.hasOwnProperty(pressedKey)) {
    return simpleValues[pressedKey];
  } else {
    return null;
  }
}
