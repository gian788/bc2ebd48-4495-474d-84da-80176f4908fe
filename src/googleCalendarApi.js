const gapi = window.gapi;

// Client ID and API key from the Developer Console
var CLIENT_ID = '920627203031-p8l6onhpe0jaqj5v3jdh4j9qvbfhfs2t.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBtM63dJ-bFGJNX254KpS76dE04vetWEYY';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

export const getEvents = async () => {
  return new Promise((resolve) => {
    gapi.load('client:auth2', async () => {
      await gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      try {
        const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
        if (!isSignedIn) {
          gapi.auth2.getAuthInstance().signIn();
        } else {
          gapi.client.calendar.events
            .list({
              calendarId: 'primary',
              timeMin: new Date().toISOString(),
              showDeleted: false,
              singleEvents: true,
              maxResults: 10,
              orderBy: 'startTime',
            })
            .then((response) => {
              resolve(response.result.items);
            });
        }
      } catch (error) {
        console.log(JSON.stringify(error, null, 2));
      }
    });
  });
};
