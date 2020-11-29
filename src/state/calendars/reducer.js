import { keyBy } from 'lodash/fp';
import { CALENDARS_FECTH_SUCCESS } from './actions';

const defaultState = {
  byId: {},
};

const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case CALENDARS_FECTH_SUCCESS:
      return { ...state, byId: keyBy('id', action.calendars) };
    default:
      return state;
  }
};

export default reducers;
