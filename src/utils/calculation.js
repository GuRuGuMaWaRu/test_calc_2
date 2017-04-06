export const tooLarge = (input) => { // check if the number is too large
  let inputInString = input.toString(10);

  if (inputInString.indexOf('e') !== -1)
    return true;
  if (inputInString.indexOf('.') !== -1)
    inputInString = inputInString.slice(0, inputInString.indexOf('.'));

  return inputInString.length > 15;
}

export const checkForExponential = (input) => { // turn a large number into exponential
  return tooLarge(input) ? input.toExponential(8) : input;
}

export const calculateSimple = (_match, firstNumber, operator, secondNumber) => {
  const floatingPoint = firstNumber.indexOf('.') !== -1 || secondNumber.indexOf('.') !== -1;
  // let firstNumberPercent = false;
  //
  // if (firstNumber.indexOf('%') !== -1) {
  //   firstNumberPercent = true;
  // }
  //
  // if (firstNumberPercent) {
  //   firstNumber *= 0.01;
  // }

  switch(operator) { // perform a calculation depending on passed operator
    case '+':
      return checkForExponential(Number(firstNumber) + Number(secondNumber));
    case '-':
      return checkForExponential(Number(firstNumber) - Number(secondNumber));
    case '*':
      return checkForExponential(Number(firstNumber) * Number(secondNumber));
    case '/':
      return checkForExponential(Number(firstNumber) / Number(secondNumber));
    default:
      return '';
  }
}

export const calculateOuter = (input) => {
  try {
    //=== return if only one number is left
    if (/^(\-)?\d+(\.)?(\d+)?(e\+\d+)?(e\-\d+)?(%)?$/.test(input)) {
      //=== handle single number with percent sign
      if (input.indexOf('%') !== -1) {
        const number = input.slice(0, input.indexOf('%'));
        return (Number(number) * 0.01).toString();
      }
      //=== handle single number
      return input;
    } else {
        //=== handle operators priority
      if (input.indexOf('*') !== -1 || input.indexOf('/') !== -1) {
        //=== first handle multiplication & division
        return calculateOuter(input.replace(/(\-?[\d\.%]+(?:e\+\d+)?)([\/\*])(\-?[\d\.%]+(?:e\+\d+)?)/, calculateSimple));
      } else {
        //=== then handle addition & subtraction
        return calculateOuter(input.replace(/(\-?[\d\.%]+(?:e\+\d+)?)([\+\-])(\-?[\d\.%]+(?:e\+\d+)?)/, calculateSimple));
      }
    }
  } catch (e) {
    console.error(e);
  }
}

export const calculateBracketedExpression = (input) => {
  const expressionStart = input.lastIndexOf('(');
  const expressionEnd = input.indexOf(')', expressionStart) === -1
    ? input.length
    : input.indexOf(')', expressionStart);
  const inputHead = input.slice(0, expressionStart);
  const inputTail = expressionEnd === input.length
    ? ''
    : input.slice(expressionEnd + 1);
  const expression = expressionEnd === input.length
    ? input.slice(expressionStart + 1)
    : input.slice(expressionStart + 1, expressionEnd);

  return inputHead + calculateOuter(expression) + inputTail;
}

export const calculationParser = (input) => {
  if (input.length === 0) { // solve issue with empty input
    return input;
  }
  if (/[\/\+\-\*\(]$/.test(input)) {
    return calculationParser(input.slice(0, -1)); // remove trailing operator ot bracket if present
  }
  if (input.indexOf('(') !== -1) { // follow this branch if there are opening brackets
    if (input.indexOf(')') === -1) { // if there are only opening brackets, remove them
      return calculationParser(input.replace(/\(/g, '')); // call calculationParser again, but this time without brackets
    } else {
      return calculationParser(calculateBracketedExpression(input)); // calculate one bracketed expression & repeat
    }
  } else  { // there are no brackets
    return calculateOuter(input);
  }
}
