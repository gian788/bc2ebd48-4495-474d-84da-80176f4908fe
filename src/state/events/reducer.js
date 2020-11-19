import { flow, values, flatten } from 'lodash/fp';
import { EVENTS_FECTH_SUCCESS } from './actions';

const defaultState = {
  list: [],
};

const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case EVENTS_FECTH_SUCCESS:
      const list = flow(values, flatten)(action.events);
      return { ...state, list };
    default:
      return state;
  }
};

export default reducers;
