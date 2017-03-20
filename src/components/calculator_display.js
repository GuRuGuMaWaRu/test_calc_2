import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

export class CalculatorDisplay extends Component {
  render() {
    const { display, result } = this.props;

    const inputToArray = Array.prototype.slice.call(display);
    const testing = inputToArray.map((char, index) => {
      if (/[\/\+\-\*]/.test(char)) {
        return <span key={char+index} className='operator'>{char}</span>
      } else {
        return char;
      }
    });


    function prepareDisplay(input) {
      // const inputToArray = Array.prototype.slice.call(display);
      // create array from array-like input
      //
    }

    return (
      <div className="calculator-display">
        <div className="calculator-display-input padding">{testing}</div>
        <div className="calculator-display-result padding">{result}</div>
      </div>
    );
  }
}

CalculatorDisplay.propTypes = {
  display: PropTypes.string,
  result: PropTypes.string
}

function mapStateToProps(state) {
  return {
    display: state.input.display,
    result: state.input.result
  }
}

export default connect(mapStateToProps)(CalculatorDisplay);
