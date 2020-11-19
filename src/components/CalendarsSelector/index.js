import clsx from 'clsx';
import { map } from 'lodash/fp';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => {
  return {
    calendarsSelector: {
      padding: theme.spacing(1),
      marginRight: theme.spacing(2),
      minWidth: 150,
    },
    title: {
      marginBottom: theme.spacing(1),
    },
    calendarIcon: {
      width: theme.spacing(2),
      height: theme.spacing(2),
      marginRight: theme.spacing(1),
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
      boxShadow: theme.shadow[2],
    },
    calendarNoCalendars: {
      fontWeight: theme.typography.fontWeight.light,
      fontStyle: 'italic',
      fontSize: '0.85rem',
    },
    calendarLoadingCalendars: {
      fontWeight: theme.typography.fontWeight.light,
      fontStyle: 'italic',
      fontSize: '0.85rem',
    },
    calendarName: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  };
});

const CalendarsSelector = ({
  calendars = [],
  isLoading,
  selectedCalendars = {},
  setSelectedCalendars,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.calendarsSelector}>
      <div className={classes.title} data-testid="calendar-selctor-title">
        CALENDARS
      </div>
      <div>
        {isLoading && (
          <div data-testid="calendar-selctor-loading" className={classes.calendarLoadingCalendars}>
            Loading calendars...
          </div>
        )}
        {!calendars.length && !isLoading && (
          <div data-testid="calendar-selctor-no-calendar" className={classes.calendarNoCalendars}>
            No calendar found
          </div>
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
              <div className={classes.calendarName}>{summary}</div>
            </div>
          ),
          calendars,
        )}
      </div>
    </div>
  );
};

export default CalendarsSelector;
