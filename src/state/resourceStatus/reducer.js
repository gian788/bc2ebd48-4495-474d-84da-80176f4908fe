import {
  CALENDARS_FECTH_REQUEST,
  CALENDARS_FECTH_SUCCESS,
  CALENDARS_FECTH_ERROR,
} from '../calendars/actions';

export const LOADING = 'LOADING';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

const defaultState = {
  calendars: undefined,
};

const reducers = (state = defaultState, action) => {
  switch (action.type) {
    // calendars
    case CALENDARS_FECTH_REQUEST:
      return { ...state, calendars: LOADING };
    case CALENDARS_FECTH_SUCCESS:
      return { ...state, calendars: SUCCESS };
    case CALENDARS_FECTH_ERROR:
      return { ...state, calendars: ERROR };
    default:
      return state;
  }
};

export default reducers;
