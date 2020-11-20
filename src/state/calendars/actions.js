import { getCalendars } from '../../gapiService';
import { showNotification } from '../notifications/actions';

export const CALENDARS_FECTH_REQUEST = 'calendars/FETCH_REQUEST';
export const CALENDARS_FECTH_SUCCESS = 'calendars/FETCH_SUCCESS';
export const CALENDARS_FECTH_ERROR = 'calendars/FETCH_ERROR';

export const fetchCalendars = () => async dispatch => {
  dispatch({ type: CALENDARS_FECTH_REQUEST });
  try {
    const calendars = await getCalendars();
    dispatch({ type: CALENDARS_FECTH_SUCCESS, calendars });
  } catch (error) {
    dispatch({ type: CALENDARS_FECTH_ERROR, error });
    dispatch(
      showNotification({ message: 'Ops! Something went wrong while getting your calendars!' }),
    );
  }
};
