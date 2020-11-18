import clsx from 'clsx';
import { map } from 'lodash/fp';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => {
  return {
    calendarsSelector: {
      padding: theme.spacing(1),
    },
    title: {
      marginBottom: theme.spacing(1),
    },
    calendarIcon: {
      width: theme.spacing(2),
      height: theme.spacing(2),
      marginRight: theme.spacing(0.5),
      borderRadius: '50%',
    },
    calendarItem: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(1),
      marginBottom: theme.spacing(1),
      borderRadius: theme.borderRadius,
      cursor: 'pointer',
    },
    calendarItemSelected: {
      background: '#fefefe',
    },
  };
});

const CalendarsSelector = ({ calendars = [], selectedCalendars = {}, setSelectedCalendars }) => {
  const classes = useStyles();

  return (
    <div className={classes.calendarsSelector}>
      <div className={classes.title} data-testid="calendar-selctor-title">
        CALENDARS
      </div>
      <div>
        {!calendars.length && (
          <div data-testid="calendar-selctor-no-calendar">No calendar found</div>
        )}
        {map(
          ({ id, backgroundColor, summary }) => (
            <div
              key={id}
              data-testid="calendar-selctor-item"
              className={clsx(classes.calendarItem, {
                [classes.calendarItemSelected]: selectedCalendars[id],
              })}
              onClick={() =>
                setSelectedCalendars({ ...selectedCalendars, [id]: !selectedCalendars[id] })
              }
            >
              <div
                data-testid="calendar-selctor-item-dot"
                className={classes.calendarIcon}
                style={{ backgroundColor }}
              />
              <div>{summary}</div>
            </div>
          ),
          calendars,
        )}
      </div>
    </div>
  );
};

export default CalendarsSelector;
