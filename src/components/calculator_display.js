import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

export class CalculatorDisplay extends Component {

  render() {
    return (
      <div className="calculator-display">
        <div className="calculator-display-input">{this.props.display}</div>
        <div className="calculator-display-result">{this.props.result}</div>
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
