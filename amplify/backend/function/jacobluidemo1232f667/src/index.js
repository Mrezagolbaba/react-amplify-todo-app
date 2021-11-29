const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio_phone = process.env.TWILIO_PHONE;

const client = require('twilio')(accountSid, authToken);
exports.handler = event => {
  console.log('event: ', event, accountSid, authToken, twilio_phone);
  client.messages
    .create({
      body: event.text,
      to: event.number, // your phone number
      from: twilio_phone, // a valid Twilio number
      mediaUrl: [event.img_url],
    })
    .then(message => {
      console.log('success ! :', message);
    })
    .catch(e => {
      console.log('MMS error: ', e);
    });
};
