import React, { Component } from 'react';
import { connect } from 'react-redux';

import CalculatorDisplay from './calculator_display';
import CalculatorKeypad from './calculator_keypad';
import '../../style/style.css';

export class App extends Component {
  render() {
    console.log(this.props.message);
    return (
      <div className="calculator">
        <CalculatorDisplay />
        <CalculatorKeypad />
        <div className={"message " + (this.props.message && "shown")}>{this.props.message}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { message: state.message.message }
}

export default connect(mapStateToProps)(App);
