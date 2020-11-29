import { format as formatDate } from 'date-fns';
import { flow, values, flatten, groupBy } from 'lodash/fp';
import { getEventStartDate } from '../../utils/dateUtils';
import { EVENTS_FECTH_SUCCESS } from './actions';

const defaultState = {
  byDate: {},
};

const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case EVENTS_FECTH_SUCCESS:
      const byDate = flow(
        values,
        flatten,
        groupBy(event => formatDate(getEventStartDate(event), 'yyyy-MM-dd')),
      )(action.events);
      return { ...state, byDate };
    default:
      return state;
  }
};

export default reducers;
