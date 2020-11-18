import { useEffect, useState } from 'react';
import { map, filter, flow, values, flatten, keyBy, mapValues } from 'lodash/fp';
import { makeStyles } from '@material-ui/styles';
import Header from './components/Header';
import { getEventsByCalendarIds, getCalendars } from './googleCalendarApi';
import CalendarsSelector from './components/CalendarsSelector';
import Calendar from './components/Calendar';

const dayHourBlockHeight = 100;

const useStyles = makeStyles((theme) => {
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
    },
  };
});

const App = () => {
  const classes = useStyles();
  const [calendars, setCalendars] = useState([]);
  const [selectedCalendars, setSelectedCalendars] = useState([]);
  const [eventsByCalendarIds, setEventsByCalendarIds] = useState({});
  const events = flow(
    values,
    flatten,
    filter(({ calendarId }) => selectedCalendars[calendarId]),
  )(eventsByCalendarIds);

  useEffect(() => {
    document.getElementById('calendarBody').scrollTop = dayHourBlockHeight * 8 + 1; // shows calendar from 8am
    getCalendars().then(setCalendars);
    getCalendars().then((calendars) => {
      setCalendars(calendars);
      setSelectedCalendars(
        flow(
          keyBy('id'),
          mapValues((v) => true),
        )(calendars),
      );
    });
  }, []);

  useEffect(() => {
    getEventsByCalendarIds(map('id', calendars)).then(setEventsByCalendarIds);
  }, [calendars]); // eslint-disable-line react-hooks/exhaustive-deps

  console.log('app events', events);
  console.log('app calendars', calendars);
  console.log('app selected calendars', selectedCalendars);

  return (
    <div className={classes.app}>
      <Header />

      <main className={classes.main}>
        <CalendarsSelector
          calendars={calendars}
          selectedCalendars={selectedCalendars}
          setSelectedCalendars={setSelectedCalendars}
        />
        <Calendar events={events} calendars={calendars} />
      </main>
    </div>
  );
};

export default App;
