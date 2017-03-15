import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import * as actions from '../actions';
import CalculatorDisplay from './calculator_display';
import CalculatorKeypad from './calculator_keypad';
import '../../style/style.css';

export class App extends Component {
  componentDidMount() {
      window.setTimeout(() => {
        document.querySelector('.test').className = 'test visible';
      }, 1000);
      window.setTimeout(() => {
        document.querySelector('.test').className = 'test';
      }, 4000);
  }

  render() {
    if (this.props.message) {
      window.setTimeout(() => {
        this.props.clearMessage();
      }, 1500);
    }

    return (
      <div className="calculator">
        <CalculatorDisplay />
        <CalculatorKeypad />
        <div className={`message${(this.props.message ? ' visible' : '')}`}>{this.props.message}</div>
        <div className="test">This is a test</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { message: state.message.message }
}

export default connect(mapStateToProps, actions)(App);
