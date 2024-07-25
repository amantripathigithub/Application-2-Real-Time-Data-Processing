const nodemailer = require('nodemailer');
const { getDailyWeatherSummary, checkAlertConditions } = require('./utils');

const ALERT_THRESHOLD_TEMP = parseFloat("35");
const ALERT_CONSECUTIVE_UPDATES = parseInt("2");

let lastWeatherData = [];
let alertConsecutiveCount = 0;

EMAIL_PASS="12300"
EMAIL_USER="at22@gmail.com"

const checkAlerts = (weatherData) => {
  const dailySummary = getDailyWeatherSummary(weatherData);
  if (checkAlertConditions(dailySummary)) {
    alertConsecutiveCount += 1;
    if (alertConsecutiveCount >= ALERT_CONSECUTIVE_UPDATES) {
      sendAlert(dailySummary);
      alertConsecutiveCount = 0;
    }
  } else {
    alertConsecutiveCount = 0;
  }
};

const sendAlert = (summary) => {
  // Email setup
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });

  const mailOptions = {
    from: EMAIL_USER,
    to: EMAIL_USER,
    subject: 'Weather Alert',
    text: `Alert! The following weather conditions have been met:\n\n${JSON.stringify(summary, null, 2)}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending alert:', error);
    } else {
      console.log('Alert sent:', info.response);
    }
  });
};

module.exports = { checkAlerts };
