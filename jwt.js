const dotenv = require('dotenv')

dotenv.config()

const { google } = require('googleapis')

const { 
  SERVICE_ACCOUNT_CLIENT_EMAIL,
  SERVICE_ACCOUNT_PRIVATE_KEY,
  CALENDAR_ID 
} = process.env

const fixedKey = SERVICE_ACCOUNT_PRIVATE_KEY.replace(new RegExp("\\\\n", "\g"), "\n")

const jwtClient = new google.auth.JWT(
  SERVICE_ACCOUNT_CLIENT_EMAIL,
  null,
  fixedKey,
  ['https://www.googleapis.com/auth/calendar']
)

jwtClient.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Successfully connected!");
  }
 });


async function main() {
  const calendar = await google.calendar('v3')
  
  const res = await calendar.events.list({
    auth: jwtClient,
    calendarId: CALENDAR_ID,
  })

  console.log(res.data)
};

main().catch(console.error);