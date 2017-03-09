import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

export class CalculatorDisplay extends Component {
  componentWillMount() {
    this.props.setInput();
  }

  render() {
    return (
      <div className="calculator-display">
        <div className="calculator-display-input">{this.props.input}</div>
        <div className="calculator-display-result">Result</div>
      </div>
    );
  }
}

CalculatorDisplay.propTypes = {
  setInput: PropTypes.func.isRequired,
  input: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  return { input: state.input }
}

export default connect(mapStateToProps, actions)(CalculatorDisplay);
