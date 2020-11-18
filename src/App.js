import { useEffect, useState } from 'react';
import moment from 'moment';
import clsx from 'clsx';
import { times, map, filter, get, find, flow, values, flatten, keyBy, mapValues } from 'lodash/fp';
import { makeStyles } from '@material-ui/styles';
import Header from './Header';
import { getEventsByCalendarIds, getCalendars } from './googleCalendarApi';
import CalendarsSelector from './CalendarsSelector';

const dayHourBlockHeight = 100;
const startOfTheWeek = moment().startOf('week').add(1, 'days'); // to start the week on monday

const useStyles = makeStyles((theme) => {
  console.log(theme);
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
    calendar: {
      background: theme.palette.paper,
      display: 'flex',
      flexDirection: 'column',
      marginBottom: theme.spacing(4),
      width: '100%',

      borderRadius: theme.borderRadius,
    },
    dayHeader: {
      padding: theme.spacing(2),
      display: 'flex',
      alignItems: 'center',
      height: 60,
      boxSizing: 'border-box',
      borderWidth: '0 1px 1px 0',
      borderStyle: 'solid',
      borderColor: 'silver',
    },
    dayOfTheMonth: {
      padding: theme.spacing(1),
      marginRight: theme.spacing(0.5),
      fontWeight: 'bold',
      fontSize: '1.2rem',
    },
    dayHourBlock: {
      height: dayHourBlockHeight,
      borderWidth: '1px 1px 0 0',
      borderStyle: 'solid',
      borderColor: 'silver',
      boxSizing: 'border-box',
    },
    cornerBlock: {
      width: 60,
      height: '100%',
      borderWidth: '0 1px 0 0',
      borderStyle: 'solid',
      borderColor: 'silver',
      boxSizing: 'border-box',
    },
    legend: {
      flexGrow: 0,
      paddingTop: 6,
    },
    hourBlockLegend: {
      height: dayHourBlockHeight,
      width: 60,
      fontSize: '0.75rem',
      textAlign: 'right',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      paddingRight: 2,

      borderWidth: '0 1px 0 0',
      borderStyle: 'solid',
      borderColor: 'silver',
      boxSizing: 'border-box',
    },
    dayOfTheMonthToday: {
      borderRadius: '50%',
      background: theme.palette.primary,
      color: 'white',
    },
    calendarBody: {
      display: 'flex',
      overflowX: 'scroll',
    },
    dayColumn: {
      flexGrow: 1,
      width: 'calc(100% / 7 - 60px)',
      position: 'relative',
    },

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
    eventTime: {},
    calendarHeader: {
      display: 'flex',
      height: 60,
      width: '100%',
    },
  };
});

const CalendarHeader = () => {
  const classes = useStyles();
  return (
    <div className={classes.calendarHeader}>
      <div className={classes.cornerBlock}></div>
      {times((i) => {
        const day = moment(startOfTheWeek).add(i, 'days');

        return (
          <div className={classes.dayColumn}>
            <div className={classes.dayHeader}>
              <div
                className={clsx(classes.dayOfTheMonth, {
                  [classes.dayOfTheMonthToday]: moment().dayOfYear() === day.dayOfYear(),
                })}
              >
                {day.format('D')}
              </div>
              <div className={classes.dayOfThWeek}>{day.format('dddd')}</div>
            </div>
          </div>
        );
      }, 7)}
    </div>
  );
};

const Legend = () => {
  const classes = useStyles();
  return (
    <div className={classes.legend}>
      {times((i) => {
        return (
          <div className={classes.hourBlockLegend}>
            {moment()
              .set('hour', i + 1)
              .format('h a')}
          </div>
        );
      }, 24)}
    </div>
  );
};

const App = () => {
  const classes = useStyles();

  const [eventsByCalendarIds, setEventsByCalendarIds] = useState({});
  const [calendars, setCalendars] = useState([]);
  const [selectedCalendars, setSelectedCalendars] = useState([]);
  useEffect(() => {
    document.getElementById('calendarBody').scrollTop = dayHourBlockHeight * 8 + 1;
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
    console.log(calendars, 'feetch');
    getEventsByCalendarIds(map('id', calendars)).then(setEventsByCalendarIds);
  }, [calendars]); // eslint-disable-line react-hooks/exhaustive-deps
  const events = flow(
    values,
    flatten,
    filter(({ calendarId }) => selectedCalendars[calendarId]),
  )(eventsByCalendarIds);
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
        <div className={classes.calendar}>
          <CalendarHeader />
          <div className={classes.calendarBody} id="calendarBody">
            <Legend />

            {times((i) => {
              const day = moment(startOfTheWeek).add(i, 'days');
              const dayEvents = filter(
                ({ start, end }) => moment(start.dateTime).diff(day, 'days') === 0,
                events,
              );

              return (
                <div className={classes.dayColumn}>
                  {map((event) => {
                    const top = moment(event.start.dateTime).hours() * dayHourBlockHeight;
                    const minutes = moment(event.end.dateTime).diff(
                      event.start.dateTime,
                      'minutes',
                    );
                    const height = (minutes / 60) * dayHourBlockHeight;

                    const backgroundColor = get(
                      'backgroundColor',
                      find({ id: event.calendarId }, calendars),
                    );

                    return (
                      <div className={classes.event} style={{ top, height, backgroundColor }}>
                        <div className={classes.eventSummary}>{event.summary}</div>
                        <div className={classes.eventTime}>
                          {moment(event.start.dateTime).format('h')} -{' '}
                          {moment(event.end.dateTime).format('h a')}
                        </div>
                      </div>
                    );
                  }, dayEvents)}
                  {times(
                    (i) => (
                      <div className={classes.dayHourBlock}></div>
                    ),
                    24,
                  )}
                </div>
              );
            }, 7)}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
