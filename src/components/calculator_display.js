import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

export class CalculatorDisplay extends Component {
  componentWillMount() {
    // this.props.setInput();
  }

  render() {
    console.log(this.props);
    return (
      <div className="calculator-display">
        <div className="calculator-display-input">{this.props.input}</div>
        <div className="calculator-display-result">Result</div>
      </div>
    );
  }
}

CalculatorDisplay.propTypes = {
  input: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  return { input: state.input }
}

export default connect(mapStateToProps)(CalculatorDisplay);
