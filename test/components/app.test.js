import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../src/components/app';

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
  it('shows a calculator display', () => {

  });
  it('shows a calculator keypad', () => {

  });
});
