import { format as formatDate } from 'date-fns';
import { getOr } from 'lodash/fp';
import { makeStyles } from '@material-ui/styles';
import { mapWeekDays } from '../../utils/dateUtils';
import DayColumn from './DayColumn';
import CalendarHeader from './Header';
import HoursLegend from './HoursLegend';
import { dayHourBlockHeight } from './HourBlock';

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

// shows calendar from 8am
export const scrollCalendarTo8am = () =>
  (document.getElementById('calendarBody').scrollTop = dayHourBlockHeight * 8 + 1);

const Calendar = ({ eventsByDay, calendarsById }) => {
  const classes = useStyles();

  return (
    <div className={classes.calendar}>
      <CalendarHeader />
      <div className={classes.calendarBody} id="calendarBody">
        <HoursLegend />
        {mapWeekDays(day => (
          <DayColumn
            day={day}
            events={getOr([], formatDate(day, 'yyyy-MM-dd'), eventsByDay)}
            calendarsById={calendarsById}
            key={day.getTime()}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
