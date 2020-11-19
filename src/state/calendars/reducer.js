import { CALENDARS_FECTH_SUCCESS } from './actions';

const defaultState = {
  list: [],
};

const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case CALENDARS_FECTH_SUCCESS:
      return { ...state, list: action.calendars };
    default:
      return state;
  }
};

export default reducers;
