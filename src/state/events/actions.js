import { getEventsByCalendarIds } from '../../gapiService';

export const EVENTS_FECTH_REQUEST = 'events/FETCH_REQUEST';
export const EVENTS_FECTH_SUCCESS = 'events/FETCH_SUCCESS';
export const EVENTS_FECTH_ERROR = 'events/FETCH_ERROR';

export const fetchEventsByCalendarIds = calendarIds => async dispatch => {
  dispatch({ type: EVENTS_FECTH_REQUEST });
  try {
    const events = await getEventsByCalendarIds(calendarIds);
    dispatch({ type: EVENTS_FECTH_SUCCESS, events });
  } catch (error) {
    dispatch({ type: EVENTS_FECTH_ERROR, error });
  }
};
