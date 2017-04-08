import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import CalculatorDisplay from './calculator_display';
import CalculatorKeypad from './calculator_keypad';
import '../../style/style.css';

export class App extends Component {
  render() {
    const message = this.props.message;
    // hide message, if present
    if (message.length > 0) {
      window.setTimeout(() => {
        this.props.hideMessage();
      }, 1500);
    }

    return (
      <div className="calculator">
        <CalculatorDisplay />
        <CalculatorKeypad />
        <div className={message.length > 0 ? 'message visible' : 'message'}>
          {message}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  message: PropTypes.string,
}

function mapStateToProps(state) {
  return {
    message: state.message.content,
  };
}

export default connect(mapStateToProps, actions)(App);
