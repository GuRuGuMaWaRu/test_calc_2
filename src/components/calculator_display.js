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
      let size;

      if (input.length < 13) {
        size = 'size-large';
      } else if (input.length < 17) {
        size = 'size-medium';
      } else {
        size = 'size-small';
      }

      return (
        <div className={size}>
          {
            inputToArray.map((char, index) => {
              if (/[\/\+\-\*]/.test(char)) {
                return <span key={char+index} className='operator'>{char}</span>
              } else {
                return char;
              }
            })
          }
        </div>
      );
    }

    return (
      <div className="calculator-display">
        <div className="calculator-display-input padding">{prepareDisplay(inputToArray)}</div>
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
