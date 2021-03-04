const dotenv = require('dotenv')

dotenv.config()

const { google } = require('googleapis');

const { API_KEY, CALENDAR_ID } = process.env

const calendar = google.calendar({
    version: 'v3',
    auth: API_KEY
});

// Set beginning of query to 3 pm tomorrow
const day = new Date()
const tomorrow3pm = new Date();
tomorrow3pm.setDate(day.getDate() + 1);
tomorrow3pm.setHours(15, 0, 0);

// Set end of query to 4 pm tomorrow
const tomorrow4pm = new Date();
tomorrow4pm.setDate(day.getDate() + 1);
tomorrow4pm.setHours(16, 0, 0);

// Make the query
calendar.freebusy.query({
    resource: {
        // Set times to ISO strings as such
        timeMin: new Date(tomorrow3pm).toISOString(), 
        timeMax: new Date(tomorrow4pm).toISOString(),
        timeZone: 'NZ',
        items: [{ id: CALENDAR_ID }]
    }
}).then((result) => {
    const busy = result.data.calendars[CALENDAR_ID].busy;
    const errors = result.data.calendars[CALENDAR_ID].errors;
    if (undefined !== errors) {
        console.error('Check this this calendar has public free busy visibility');
    } else if (busy.length !== 0) {
        console.log('Busy');
    } else {
        console.log('Free');
    }
}).catch((e) => {
    console.error(e);
});