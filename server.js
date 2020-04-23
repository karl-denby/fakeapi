'use strict';
require('dotenv').config();
const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const cors = require('cors')
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if ('OPTIONS' == req.method) {
     res.sendStatus(200);
   }
   else {
     next();
   }});

app.get('/', (req, res) => {
  res.send({
    'Hello': 'World'
  });
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
  res.send({
    'message': 'Check your email'
  })
})

app.get('/env', cors(), (req, res) => {
  res.send({
    'app_name': process.env.APP_NAME
  });
});

app.get('/dayofweek', (req, res) => {
  let options = { weekday: 'long' };
  res.send({
    'day': new Intl.DateTimeFormat('en-US', options).format(new Date())
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);