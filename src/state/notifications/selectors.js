import { flow, get, values } from 'lodash/fp';

export const getNotifications = flow(get('notifications.dict'), values);
