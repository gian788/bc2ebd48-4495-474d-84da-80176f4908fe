import { times, map } from 'lodash/fp';
import { makeStyles } from '@material-ui/styles';
import Event from './Event';
import HourBlock from './HourBlock';

const useStyles = makeStyles(theme => {
  return {
    dayColumn: {
      flexGrow: 1,
      width: 'calc(100% / 7 - 60px)',
      position: 'relative',
    },
  };
});

const DayColumn = ({ events, calendars }) => {
  const classes = useStyles();

  return (
    <div className={classes.dayColumn}>
      {map(
        event => (
          <Event event={event} calendars={calendars} key={event.id} />
        ),
        events,
      )}
      {times(
        i => (
          <HourBlock key={i} />
        ),
        24,
      )}
    </div>
  );
};

export default DayColumn;
