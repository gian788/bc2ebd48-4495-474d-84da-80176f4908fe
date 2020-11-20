import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { map, filter, flow, keyBy, mapValues } from 'lodash/fp';
import { makeStyles } from '@material-ui/styles';
import Calendar from './components/Calendar';
import CalendarsSelector from './components/CalendarsSelector';
import ErrorNotification from './components/ErrorNotification';
import Header from './components/Header';
import { fetchCalendars } from './state/calendars/actions';
import { getCalendars } from './state/calendars/selectors';
import { fetchEventsByCalendarIds } from './state/events/actions';
import { getEvents } from './state/events/selectors';
import { isLoading } from './state/resourceStatus/selectors';

const dayHourBlockHeight = 100;

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
  calendars,
  events,
  areCalendarsLoading,
  fetchCalendars,
  fetchEventsByCalendarIds,
}) => {
  const classes = useStyles();
  const [selectedCalendars, setSelectedCalendars] = useState([]);
  const filteredEvents = filter(({ calendarId }) => selectedCalendars[calendarId], events);

  useEffect(() => {
    document.getElementById('calendarBody').scrollTop = dayHourBlockHeight * 8 + 1; // shows calendar from 8am

    fetchCalendars();
  }, [fetchCalendars]);

  useEffect(() => {
    if (calendars.length) {
      fetchEventsByCalendarIds(map('id', calendars));
      setSelectedCalendars(
        flow(
          keyBy('id'),
          mapValues(v => true),
        )(calendars),
      );
    }
  }, [calendars]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classes.app}>
      <Header />

      <main className={classes.main}>
        <CalendarsSelector
          calendars={calendars}
          selectedCalendars={selectedCalendars}
          setSelectedCalendars={setSelectedCalendars}
          isLoading={areCalendarsLoading}
        />
        <Calendar events={filteredEvents} calendars={calendars} />
      </main>

      <ErrorNotification />
    </div>
  );
};

const mapStateToProps = state => ({
  calendars: getCalendars(state),
  events: getEvents(state),
  areCalendarsLoading: isLoading('calendars')(state),
});

const mapDispatchToProps = dispatch => ({
  fetchCalendars: () => dispatch(fetchCalendars()),
  fetchEventsByCalendarIds: calendarIds => dispatch(fetchEventsByCalendarIds(calendarIds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
