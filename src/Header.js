import moment from 'moment';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => {
  console.log(theme);
  return {
    header: {
      padding: theme.spacing(2),
    },
  };
});

const Header = () => {
  const classes = useStyles();
  return <header className={classes.header}>{moment().format('MMMM, YYYY')}</header>;
};

export default Header;
