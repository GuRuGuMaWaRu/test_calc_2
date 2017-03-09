import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

// import TestUtils from 'react-addons-test-utils';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import reducers from '../../src/reducers';

import App from '../../src/components/app';
import CalculatorDisplay from '../../src/components/calculator_display';
import CalculatorKeypad from '../../src/components/calculator_display';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    const context = { input: '12345' };
    const app = mount(<App />, { context })
    // const app = TestUtils.renderIntoDocument(
    //   <Provider store={createStore(reducers)}>
    //   </Provider>
    // );
    ReactDOM.render(app, div);
    // ReactDOM.render(app, div);
  });
  it('shows display', () => {
    expect(wrapper.find(CalculatorDisplay)).toBeTruthy();
  });
  it('shows keypad', () => {
    expect(wrapper.find(CalculatorKeypad)).toBeTruthy();
  });
});
