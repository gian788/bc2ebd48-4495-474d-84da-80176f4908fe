import { getEventsByCalendarIds } from '../../utils/gapiService';

export const EVENTS_FECTH_REQUEST = 'events/FETCH_REQUEST';
export const EVENTS_FECTH_SUCCESS = 'events/FETCH_SUCCESS';
export const EVENTS_FECTH_ERROR = 'events/FETCH_ERROR';

export const fetchEventsByCalendarIds = calendarIds => async dispatch => {
  dispatch({ type: EVENTS_FECTH_REQUEST, calendarIds });
  try {
    const events = await getEventsByCalendarIds(calendarIds);
    dispatch({ type: EVENTS_FECTH_SUCCESS, events });
  } catch (error) {
    console.log(error); // eslint-disable-line
    dispatch({ type: EVENTS_FECTH_ERROR, error });
  }
};
