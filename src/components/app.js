import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import * as actions from '../actions';
import CalculatorDisplay from './calculator_display';
import CalculatorKeypad from './calculator_keypad';
import '../../style/style.css';

export class App extends Component {
  render() {
    if (this.props.message) {
      window.setTimeout(() => {
        this.props.clearMessage();
      }, 1000);
    }

    return (
      <div className="calculator">
        <CalculatorDisplay />
        <CalculatorKeypad />
        <div className={`message${(this.props.message ? ' visible' : '')}`}>{this.props.message}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { message: state.message.message }
}

export default connect(mapStateToProps, actions)(App);
