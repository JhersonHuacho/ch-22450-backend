
const accountSid = 'AC8a7a3c731c1972cc9d885e30ae84cafb';
const authToken = 'c565e71a29591b1d8cc43008db44e5d2';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'Hola soy un SMS desde Node.js!',
    messagingServiceSid: 'MGe9cb9becce1297bdb9f018a4f2fb6043',
    to: '+51944954119'
  })
  .then(message => console.log(message.sid))
  .done();