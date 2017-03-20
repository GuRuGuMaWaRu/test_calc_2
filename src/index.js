import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container')
);

/*
***1 - add pointer cursor for buttons
***2 - disable mouse selection for buttons
***3 - solve issue with '=' - the new parsed number is localized - need fix that
***5 - keyboard input
6 - different color for the displayed result after '=' is pressed
7 - different color for operators
8 - font-size and length restriction
9 - SOLVE = division is the next in priority after multiplication
  (addition & subtraction dont have any priority and should be handled from left to right)
10 - ripple animation
*/
