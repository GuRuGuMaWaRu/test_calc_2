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
    return 'Maximum number of characters reached: 100';
  } else if (/[\d\.]/.test(currentInput) && maxNumberLength(previousInput)) {
    return 'Maximum number of characters in a number: 15';
  } else if (/[\/\+\-\*]/.test(currentInput) && maxOperatorNumber(previousInput)) {
    return 'Maximum number of operators: 20';
  } else if (/\d/.test(currentInput) && maxDecimalDotLength(previousInput)) {
    return 'Maximum number of digits after decimal dot: 10';
  }
  return '';
}

export const parseInput = (previousInput, currentInput) => {
  const handlers = [
    {
      value: /\+\/\-/,
      test: /\(\-(\d+)?\+\/\-$/, //=== remove a negative sign
      convert: '$1'
    },
    {
      value: /\+\/\-/,
      test: /(\d+)?\+\/\-$/, //=== add a negative sign
      convert: '(-$1'
    },
    {
      value: /\d/,
      test: /(^|[\/\+\-\*\(])0(\d)/, //=== solve leading zero issue
      convert: '$1$2'
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
      test: /([\/\+\-\*])\(\)/, //=== solve 'input opening bracket after an operator' issue
      convert: '$1('
    }
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
        test: /(\d|\.)\(\)/,
        convert: '$1)'
      });
    } else {
      handlers.push({
        value: /\(\)/,
        test: /(\d|\.|\))\(\)/,
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
    if (number.endsWith('.')) {
      number = Number(number);
      return (number.toLocaleString('en-US', {maximumFractionDigits: 10})) + '.';
    } else {
      number = Number(number);
      return number.toLocaleString('en-US', {maximumFractionDigits: 10});
    }
  }
  return input.replace(/([\d\.]+)/g, replaceNumber);
}
