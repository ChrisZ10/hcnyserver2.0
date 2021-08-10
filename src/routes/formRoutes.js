const express = require('express');
const nodemailer = require('nodemailer');

const GMAIL_ADDRESS = "info@hcny.org";
const GMAIL_PASSWORD = "Hcny@123!";

const router = express.Router();

const mailer = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: GMAIL_ADDRESS,
    pass: GMAIL_PASSWORD
  }
});

router.post('/api/v1/contact-form', async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;
  mailer.sendMail({
    from: GMAIL_ADDRESS,
    to: GMAIL_ADDRESS,
    subject: `Message from ${lastName}, ${firstName}`,
    html: `${message} | ${email} | ${phone}`
  }, (err, info) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({success: true});
  })
});

router.post('/api/v1/prayer-request-form', async (req, res) => {
  const { firstName, lastName, email, phone, prayerRequest, open } = req.body;
  let content = `${prayerRequest} | ${email} | ${phone}`;
  if (open === 't') {
    content + "| 公開代禱事項"
  } else {
    content + "| 不公開代禱事項"
  }
  mailer.sendMail({
    from: GMAIL_ADDRESS,
    to: GMAIL_ADDRESS,
    subject: `Prayer Request from ${lastName}, ${firstName}`,
    html: content
  }, (err, info) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({success: true});
  })
});

module.exports = {
  formRoutes: router,
  address: GMAIL_ADDRESS,
  password: GMAIL_PASSWORD
};

