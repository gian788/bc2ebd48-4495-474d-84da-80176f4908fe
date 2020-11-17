import { useEffect, useState } from 'react';
import moment from 'moment';
import clsx from 'clsx';
import {
  times,
  map,
  filter,
  get,
  find,
  flow,
  values,
  flatten,
  keyBy,
  mapValues,
  omit,
  keys,
} from 'lodash/fp';
import { makeStyles } from '@material-ui/styles';
import './App.css';
import Header from './Header';
import { getEventsByCalendarIds, getCalendars } from './googleCalendarApi';

const dayHourBlockHeight = 100;

const useStyles = makeStyles((theme) => {
  console.log(theme);
  return {
    app: {
      display: 'flex',
      flexDirection: 'column',
      background: theme.palette.background,
    },
    main: {
      display: 'flex',
    },
    calendar: {
      background: theme.palette.paper,
      display: 'flex',
      marginBottom: theme.spacing(4),
    },
    dayHeader: {
      padding: theme.spacing(2),
      display: 'flex',
      alignItems: 'center',
      height: 60,
      boxSizing: 'border-box',
    },
    dayOfTheMonth: {
      padding: theme.spacing(1),
      marginRight: theme.spacing(0.5),
    },
    dayHourBlock: {
      height: dayHourBlockHeight,
      borderWidth: '1px 0 0 0',
      borderStyle: 'solid',
      borderColor: 'silver',
      boxSizing: 'border-box',
    },
    cornerBlock: {
      width: 60,
      height: 60,
    },
    hourBlockLegend: {
      height: dayHourBlockHeight,
      width: 60,
      fontSize: '0.75rem',
      textAlign: 'right',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    header: {
      display: 'flex',
    },
    dayOfTheMonthToday: {
      borderRadius: '50%',
      background: theme.palette.primary,
      color: 'white',
    },
    body: {
      display: 'flex',
    },
    dayColumn: {
      borderWidth: '0 0 0 1px',
      borderStyle: 'solid',
      borderColor: 'silver',
    },

    leftBar: {
      padding: theme.spacing(1),
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
    },
    dayHourBlockContainer: {
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
    },
    eventSummary: {
      fontWeight: 'bold',
    },
    eventTime: {},
    calendarItemSelected: {
      background: '#fefefe',
    },
  };
});

function App() {
  const classes = useStyles();
  const startOfTheWeek = moment().startOf('week').add(1, 'days'); // to start the week on monday
  const [eventsByCalendarIds, setEventsByCalendarIds] = useState({});
  const [calendars, setCalendars] = useState([]);
  const [selectedCalendars, setSelectedCalendars] = useState([]);
  useEffect(() => {
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
        <div className={classes.leftBar}>
          <div>CALENDARS</div>
          <div>
            {map(
              ({ id, backgroundColor, summary }) => (
                <div
                  className={clsx(classes.calendarItem, {
                    [classes.calendarItemSelected]: selectedCalendars[id],
                  })}
                  onClick={() =>
                    setSelectedCalendars({ ...selectedCalendars, [id]: !selectedCalendars[id] })
                  }
                >
                  <div className={classes.calendarIcon} style={{ backgroundColor }} />
                  <div>{summary}</div>
                </div>
              ),
              calendars,
            )}
          </div>
        </div>
        <div className={classes.calendar}>
          <div className={classes.legend}>
            <div className={classes.cornerBlock}></div>
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

          {times((i) => {
            const day = moment(startOfTheWeek).add(i, 'days');
            const dayEvents = filter(
              ({ start, end }) => moment(start.dateTime).diff(day, 'days') === 0,
              events,
            );

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

                <div className={classes.dayHourBlockContainer}>
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
              </div>
            );
          }, 7)}
        </div>
      </main>
    </div>
  );
}

export default App;
