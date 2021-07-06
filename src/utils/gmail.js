const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const catchAsync = require('./catchAsync');

const CLIENT_ID =
  '848359203952-5ngeeh6a4jo0tt3prqpdeth6mj0kbg41.apps.googleusercontent.com';

const CLIENT_SECRET = 'l0eyniA1Gq0sFIVqu01P0sO-';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN =
  '1//04dyDdAJoiU7xCgYIARAAGAQSNwF-L9Ir5CWeeC3X31c0eKgIsRlgS4S2Mi1qsxr_qsK-XlMxc6GFGOlLMzvYQCc6Ps3LrS9HGDA';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendEmail = catchAsync(async options => {
  const accessToken = await oAuth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'oAuth2',
      user: 'akash@newput.com',
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken
    }
  });

  const mailOptions = {
    from: 'AblePro <admin@ablepro.com>',
    to: options.email,
    subject: options.subject,
    html: `${options.message}`
  };
  await transporter.sendMail(mailOptions);
});

module.exports = sendEmail;
