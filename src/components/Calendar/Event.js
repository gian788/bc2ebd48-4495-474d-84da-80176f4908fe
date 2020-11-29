import { differenceInMinutes, format as formatDate, getHours, getMinutes } from 'date-fns';
import { get } from 'lodash/fp';
import { makeStyles } from '@material-ui/styles';
import { getEventStartDate, getEventEndDate } from '../../utils/dateUtils';
import { dayHourBlockHeight } from './HourBlock';

const useStyles = makeStyles(theme => {
  return {
    event: {
      position: 'absolute',
      left: 0,
      right: theme.spacing(2),
      color: 'white',
      padding: theme.spacing(1),
      boxSizing: 'border-box',
      fontSize: '0.8rem',
      borderRadius: theme.borderRadius,
    },
    eventSummary: {
      fontWeight: 'bold',
    },
  };
});

const Event = ({ event, calendar }) => {
  const classes = useStyles();
  const startDate = getEventStartDate(event);
  const endDate = getEventEndDate(event);
  const top = (getHours(startDate) + getMinutes(startDate) / 60) * dayHourBlockHeight;
  const duration = differenceInMinutes(endDate, startDate);
  const height = (duration / 60) * dayHourBlockHeight;
  const backgroundColor = get('backgroundColor', calendar);

  return (
    <div className={classes.event} style={{ top, height, backgroundColor }}>
      <div className={classes.eventSummary}>{event.summary}</div>
      <div className={classes.eventTime}>
        {formatDate(startDate, 'h')} - {formatDate(endDate, 'h a')}
      </div>
    </div>
  );
};

export default Event;
