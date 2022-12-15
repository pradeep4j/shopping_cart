import dotenv from 'dotenv';
import twilio from 'twilio';
// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
dotenv.config();

const sendSMS = async(from, to) => {
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_ACCOUNT_TOKEN;
const clientTwilio = new twilio(accountSid, authToken);

clientTwilio.messages
  .create({
     body: 'Hello your account is created with PRADEEPMERN',
     from: from,
     to: to
   })
  .then(message => console.log(`SMS message sent from ${from} to ${to}. Message SID: ${message.sid}`)).catch((error) => {
        console.error(error);
      });
}
export default sendSMS;
