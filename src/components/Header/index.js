import { format as formatDate } from 'date-fns';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => {
  return {
    header: {
      padding: theme.spacing(2, 4),
      fontSize: '1.2rem',
      borderBottom: `1px solid ${theme.palette.borderColor}`,
    },
  };
});

const Header = () => {
  const classes = useStyles();
  return <header className={classes.header}>{formatDate(new Date(), 'MMMM, yyyy')}</header>;
};

export default Header;
