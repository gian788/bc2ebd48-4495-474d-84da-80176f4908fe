import { unset } from 'lodash/fp';
import { NOTIFICATION_SHOW, NOTIFICATION_HIDE } from './actions';

const defaultState = {
  dict: {},
};

const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case NOTIFICATION_SHOW:
      return { dict: { ...state.dict, [action.id]: { id: action.id, message: action.message } } };
    case NOTIFICATION_HIDE:
      return { dict: unset(action.id, state.dict) };
    default:
      return state;
  }
};

export default reducers;
