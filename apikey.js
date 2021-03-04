const dotenv = require('dotenv')

dotenv.config()

const { google } = require('googleapis')

const { API_KEY, CALENDAR_ID } = process.env

const calendar = google.calendar('v3')

async function main(key, calendarId) {
  const eventList = await calendar.events.list({
    key,
    calendarId
  })

  console.log(eventList.data);
}

main(API_KEY, CALENDAR_ID)
.catch(console.error)