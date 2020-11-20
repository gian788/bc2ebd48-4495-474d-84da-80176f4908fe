import { v4 as uuid } from 'uuid';

const TIMEOUT = 5000;

export const NOTIFICATION_SHOW = 'notification/SHOW';
export const NOTIFICATION_HIDE = 'notification/HIDE';

export const hideNotification = id => async dispatch => {
  dispatch({ type: NOTIFICATION_HIDE, id });
};

export const showNotification = ({ message }) => async dispatch => {
  const notificationId = uuid();
  dispatch({ type: NOTIFICATION_SHOW, id: notificationId, message });
  setTimeout(() => dispatch(hideNotification(notificationId)), TIMEOUT);
};
