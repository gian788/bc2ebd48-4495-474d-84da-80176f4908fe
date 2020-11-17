import moment from 'moment';
import clsx from 'clsx';
import { times } from 'lodash/fp';
import { makeStyles } from '@material-ui/styles';
import './App.css';
import Header from './Header';

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
      height: 40,
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
      height: 40,
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
  };
});

function App() {
  const classes = useStyles();
  const startOfTheWeek = moment().startOf('week');

  return (
    <div className={classes.app}>
      <Header />

      <main className={classes.main}>
        <div>CALENDARS</div>
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
            const day = startOfTheWeek.add(i, 'days');
            return (
              <div className={classes.dayColumn}>
                <div className={classes.dayHeader}>
                  <div
                    className={clsx(classes.dayOfTheMonth, {
                      [classes.dayOfTheMonthToday]: moment().diff(day, 'days') === 0,
                    })}
                  >
                    {day.format('D')}
                  </div>
                  <div className={classes.dayOfThWeek}>{day.format('dddd')}</div>
                </div>

                <div className={classes.dayHourBlock}>
                  {times((i) => {
                    return <div className={classes.dayHourBlock}></div>;
                  }, 24)}
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
