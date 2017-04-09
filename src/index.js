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
***6 - different color for the displayed result after '=' is pressed
***7 - different color for operators
***8 - font-size and length restriction
***9 - SOLVE = division is the next in priority after multiplication
      (addition & subtraction dont have any priority and should be handled
      from left to right)
***10 - ripple animation
***11 - SOLVE - when "(6)" pressing "()" brings an error
12 - SOLVE - if the result is an "E" number, it gets displayed in input field & currently
      there is no logic to deal with such numbers - I have to parse it somehow
***13 - SOLVE - cant delete by ZERO
***14 - SOLVE - multiplication & division have equal priority and should be handled
      from left to right of the equation (e.g. 5/2*6 => first 5/2 and then 2*6)
15 - ADD animated clear sequence like in Android calculator
***16 - SOLVE - handle both percent numbers!!!
***17 - SOLVE - protection from 'divide by zero' does not allow to type in 0.012 etc
*/
