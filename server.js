'use strict';
require('dotenv').config();
const express = require('express');


// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/email', (req, res) => {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: process.env.SENDGRID_EMAIL_TO,
    from: process.env.SENDGRID_EMAIL_FROM,
    subject: 'Sendgrid email',
    text: 'triggered from express in Node.js',
    html: '<strong>triggered from express in Node.js</strong>',
  };
  sgMail.send(msg);
  res.send('Check your email')
})

app.get('/env', (req, res) => {
  res.send(process.env.APP_NAME);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);