import moment from 'moment';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => {
  return {
    header: {
      padding: theme.spacing(2),
      borderBottom: `1px solid ${theme.palette.borderColor}`,
    },
  };
});

const Header = () => {
  const classes = useStyles();
  return <header className={classes.header}>{moment().format('MMMM, YYYY')}</header>;
};

export default Header;
