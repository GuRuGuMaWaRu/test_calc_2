import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import CalculatorDisplay from './calculator_display';
import CalculatorKeypad from './calculator_keypad';
import '../../style/style.css';

export class App extends Component {
  render() {
    // hide message after some time, if present
    if (this.props.show) {
      window.setTimeout(() => {
        this.props.hideMessage();
      }, 1500);
    }

    return (
      <div className="calculator">
        <CalculatorDisplay />
        <CalculatorKeypad />
        <div className={this.props.show ? 'message visible' : 'message'}>
          {this.props.message}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  message: PropTypes.string,
  show: PropTypes.bool
}

function mapStateToProps(state) {
  return {
    message: state.message.content,
    show: state.message.show
  };
}

export default connect(mapStateToProps, actions)(App);
