import { format as formatDate } from 'date-fns';
import { makeStyles } from '@material-ui/styles';
import { mapDayHours } from '../../utils/dateUtils';
import { dayHourBlockHeight } from './HourBlock';

const useStyles = makeStyles(theme => {
  return {
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
      borderColor: theme.palette.borderColor,
      boxSizing: 'border-box',
    },
  };
});

const HoursLegend = () => {
  const classes = useStyles();
  return (
    <div className={classes.legend}>
      {mapDayHours(date => (
        <div className={classes.hourBlockLegend} key={date.getTime()}>
          {formatDate(date, 'h a')}
        </div>
      ))}
    </div>
  );
};

export default HoursLegend;
