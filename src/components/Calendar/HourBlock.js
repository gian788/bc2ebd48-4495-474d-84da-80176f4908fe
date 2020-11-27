import { makeStyles } from '@material-ui/styles';

export const dayHourBlockHeight = 100;

const useStyles = makeStyles(theme => {
  return {
    dayHourBlock: {
      height: dayHourBlockHeight,
      borderWidth: '1px 1px 0 0',
      borderStyle: 'solid',
      borderColor: theme.palette.borderColor,
      boxSizing: 'border-box',
    },
  };
});

const HourBlock = ({ key }) => {
  const classes = useStyles();

  return <div className={classes.dayHourBlock} key={key} />;
};

export default HourBlock;
