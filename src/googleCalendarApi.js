import moment from 'moment';
import { map, forEach } from 'lodash/fp';
import { apiKey, clientId } from './config';

const gapi = window.gapi;

// Client ID and API key from the Developer Console

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];

// Authorization scopes required by the API; multiple scopes can be included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

const checkAuth = async () =>
  new Promise((resolve, reject) => {
    gapi.load('client:auth2', async () => {
      await gapi.client.init({
        apiKey,
        clientId,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });
      try {
        const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
        if (!isSignedIn) {
          // gapi.auth2.getAuthInstance().signOut();
          gapi.auth2.getAuthInstance().signIn();
        } else {
          resolve();
        }
      } catch (error) {
        reject(error);
      }
    });
  });

export const getCalendars = async () => {
  try {
    await checkAuth();
    const response = await gapi.client.calendar.calendarList.list();

    return response.result.items;
  } catch (error) {
    // console.log(JSON.stringify(error, null, 2));
  }
};

export const getEventsByCalendarIds = async calendarIds => {
  try {
    await checkAuth();
    const timeMin = moment().startOf('week').toISOString();
    const timeMax = moment().endOf('week').toISOString();
    const eventsByCalendarIds = {};

    await Promise.all(
      map(async id => {
        const response = await gapi.client.calendar.events.list({
          calendarId: id,
          timeMin,
          timeMax,
          showDeleted: false,
          singleEvents: true,
          // maxResults: 10,
          orderBy: 'startTime',
        });
        eventsByCalendarIds[id] = response.result.items;
        forEach(event => {
          event.calendarId = id;
        }, eventsByCalendarIds[id]);
      }, calendarIds),
    );
    return eventsByCalendarIds;
  } catch (error) {
    // console.log(JSON.stringify(error, null, 2));
  }
};
