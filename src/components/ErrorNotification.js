import { map } from 'lodash/fp';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { hideNotification } from '../state/notifications/actions';
import { getNotifications } from '../state/notifications/selectors';

const useStyles = makeStyles(theme => {
  return {
    toast: {
      borderRadius: theme.borderRadius,
      background: theme.palette.error,
      color: 'white',
      position: 'fixed',
      bottom: theme.spacing(2),
      left: theme.spacing(2),
      padding: theme.spacing(1, 2),
      display: 'flex',
      alignItems: 'center',
      boxShadow: theme.shadow[2],
      fontSize: '0.875rem',
    },
    closeButton: {
      padding: theme.spacing(0.5),
      display: 'flex',
      borderRadius: '50%',
      marginLeft: theme.spacing(1),
      cursor: 'pointer',

      '&:hover': {
        backgroundColor: 'rgb(255 255 255 / 44%)',
      },
    },
  };
});

const Notification = ({ notifications, hideNotification }) => {
  const classes = useStyles();
  return map(
    ({ id, message }) => (
      <div className={classes.toast} key={id}>
        {message}
        <div className={classes.closeButton} onClick={() => hideNotification(id)}>
          <i className="material-icons">highlight_off</i>
        </div>
      </div>
    ),
    notifications,
  );
};

const mapStateToProps = state => ({
  notifications: getNotifications(state),
});

const mapDispatchToProps = dispatch => ({
  hideNotification: id => dispatch(hideNotification(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
