// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;

const accountSid = 'AC8a7a3c731c1972cc9d885e30ae84cafb';
const authToken = 'c565e71a29591b1d8cc43008db44e5d2';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    from: 'whatsapp:+14155238886',
    body: 'Hello there huachin whastapp!',
    to: 'whatsapp:+51944954119'
  })
  .then(message => console.log(message.sid));