import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { filter, mapValues, isEmpty, keys } from 'lodash/fp';
import { makeStyles } from '@material-ui/styles';
import Calendar, { scrollCalendarTo8am } from './components/Calendar';
import CalendarsSelector from './components/CalendarsSelector';
import ErrorNotification from './components/ErrorNotification';
import Header from './components/Header';
import { fetchCalendars } from './state/calendars/actions';
import { getCalendarsById } from './state/calendars/selectors';
import { fetchEventsByCalendarIds } from './state/events/actions';
import { getEventsByDate } from './state/events/selectors';
import { isLoading } from './state/resourceStatus/selectors';

const useStyles = makeStyles(theme => {
  // console.log(theme);
  return {
    app: {
      display: 'flex',
      flexDirection: 'column',
      background: theme.palette.background,
      height: '100vh',
      width: '100vw',
    },
    main: {
      display: 'flex',
      padding: theme.spacing(2),
      height: 'calc(100% - 50px)',
      boxSizing: 'border-box',
    },
  };
});

const App = ({
  calendarsById,
  eventsByDay,
  areCalendarsLoading,
  fetchCalendars,
  fetchEventsByCalendarIds,
}) => {
  const classes = useStyles();
  const [selectedCalendars, setSelectedCalendars] = useState([]);
  const filteredEvents = mapValues(
    filter(({ calendarId }) => selectedCalendars[calendarId]),
    eventsByDay,
  );

  useEffect(() => {
    scrollCalendarTo8am();

    fetchCalendars();
  }, [fetchCalendars]);

  useEffect(() => {
    if (!isEmpty(calendarsById)) {
      fetchEventsByCalendarIds(keys(calendarsById));
      setSelectedCalendars(mapValues(() => true, calendarsById));
    }
  }, [calendarsById]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classes.app}>
      <Header />
      <main className={classes.main}>
        <CalendarsSelector
          calendarsById={calendarsById}
          selectedCalendars={selectedCalendars}
          setSelectedCalendars={setSelectedCalendars}
          isLoading={areCalendarsLoading}
        />
        <Calendar eventsByDay={filteredEvents} calendarsById={calendarsById} />
      </main>

      <ErrorNotification />
    </div>
  );
};

const mapStateToProps = state => ({
  calendarsById: getCalendarsById(state),
  eventsByDay: getEventsByDate(state),
  areCalendarsLoading: isLoading('calendars')(state),
});

const mapDispatchToProps = dispatch => ({
  fetchCalendars: () => dispatch(fetchCalendars()),
  fetchEventsByCalendarIds: calendarIds => dispatch(fetchEventsByCalendarIds(calendarIds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
