import { isSameDay } from 'date-fns';
import { filter } from 'lodash/fp';
import { makeStyles } from '@material-ui/styles';
import { mapWeekDays, getEventStartDate } from '../../dateUtils';
import DayColumn from './DayColumn';
import CalendarHeader from './Header';
import HoursLegend from './HoursLegend';

const useStyles = makeStyles(theme => {
  return {
    calendar: {
      background: theme.palette.paper,
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      borderWidth: '0 1px 0 0',
      borderStyle: 'solid',
      borderColor: theme.palette.borderColor,
      borderRadius: theme.borderRadius,
      boxShadow: theme.shadow[2],
    },

    calendarBody: {
      display: 'flex',
      overflowX: 'scroll',
    },
  };
});

const getEventsOfTheDay = (day, events) =>
  filter(event => isSameDay(getEventStartDate(event), day), events);

const Calendar = ({ events, calendars }) => {
  const classes = useStyles();

  return (
    <div className={classes.calendar}>
      <CalendarHeader />
      <div className={classes.calendarBody} id="calendarBody">
        <HoursLegend />
        {mapWeekDays(day => (
          <DayColumn
            day={day}
            events={getEventsOfTheDay(day, events)}
            calendars={calendars}
            key={day.getTime()}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
