import { format as formatDate, isSameDay } from 'date-fns';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { mapWeekDays } from '../../dateUtils';

const useStyles = makeStyles(theme => {
  return {
    dayHeader: {
      padding: theme.spacing(2),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 60,
      boxSizing: 'border-box',
      borderWidth: '0 1px 0 0',
      borderStyle: 'solid',
      borderColor: theme.palette.borderColor,
    },
    dayOfTheMonth: {
      padding: theme.spacing(1),
      marginRight: theme.spacing(0.5),
      fontWeight: 'bold',
      fontSize: '1.2rem',
    },
    dayOfThWeek: {
      fontWeight: theme.typography.fontWeight.light,
    },
    dayOfThWeekToday: {
      fontWeight: theme.typography.fontWeight.regular,
    },
    cornerBlock: {
      width: 60,
      height: '100%',
      borderWidth: '0 1px 0 0',
      borderStyle: 'solid',
      borderColor: theme.palette.borderColor,
      boxSizing: 'border-box',
    },
    dayOfTheMonthToday: {
      borderRadius: '50%',
      background: theme.palette.primary,
      color: 'white',
    },
    dayColumn: {
      flexGrow: 1,
      width: 'calc(100% / 7 - 60px)',
      position: 'relative',
    },

    calendarHeader: {
      display: 'flex',
      height: 60,
      width: '100%',
      borderWidth: '0 0 1px 0',
      borderStyle: 'solid',
      borderColor: theme.palette.borderColor,
    },
  };
});

const CalendarHeader = () => {
  const classes = useStyles();
  return (
    <div className={classes.calendarHeader}>
      <div className={classes.cornerBlock}></div>
      {mapWeekDays(day => (
        <div className={classes.dayColumn} key={day.getTime()}>
          <div className={classes.dayHeader}>
            <div
              className={clsx(classes.dayOfTheMonth, {
                [classes.dayOfTheMonthToday]: isSameDay(day, new Date()),
              })}
            >
              {formatDate(day, 'd')}
            </div>
            <div
              className={clsx(classes.dayOfThWeek, {
                [classes.dayOfThWeekToday]: isSameDay(day, new Date()),
              })}
            >
              {formatDate(day, 'EEEE')}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalendarHeader;
