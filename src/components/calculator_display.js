import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

export class CalculatorDisplay extends Component {

  render() {
    return (
      <div className="calculator-display">
        <div className="calculator-display-input">{this.props.display}</div>
        <div className="calculator-display-result">Result</div>
      </div>
    );
  }
}

CalculatorDisplay.propTypes = {
  display: PropTypes.string
}

function mapStateToProps(state) {
  return { display: state.input.display }
}

export default connect(mapStateToProps)(CalculatorDisplay);
