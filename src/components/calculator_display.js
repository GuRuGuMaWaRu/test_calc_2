import React, { Component } from 'react';

export default class CalculatorDisplay extends Component {
  render() {
    return (
      // <div className="calculator-display">
      //   <div className="calculator-display-pan"></div>
      //   <div className="calculator-display-display">
      //     <div className="calculator-display-input">Input</div>
      //     <div className="calculator-display-result">Result</div>
      //   </div>
      //   <div className="calculator-display-pan"></div>
      // </div>
      <div className="calculator-display">
        <div className="calculator-display-input">Input</div>
        <div className="calculator-display-result">Result</div>
      </div>
    );
  }
}
