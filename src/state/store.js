import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import events from './events/reducer';
import calendars from './calendars/reducer';
import resourceStatus from './resourceStatus/reducer';

export const history = createBrowserHistory();

export const reducers = {
  calendars,
  events,
  resourceStatus,
};

/* eslint-disable no-underscore-dangle, no-undef */
const store = createStore(
  combineReducers({
    ...reducers,
    router: connectRouter(history),
  }),
  compose(
    applyMiddleware(thunk, routerMiddleware(history)),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : compose,
  ),
);
/* eslint-enable */

export default store;
