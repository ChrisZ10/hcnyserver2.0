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
  let content = `${message} | ${email}`;
  content += phone? ` | ${phone}` : ``;
  mailer.sendMail({
    from: GMAIL_ADDRESS,
    to: GMAIL_ADDRESS,
    subject: `Message from ${lastName} ${firstName}`,
    html: content
  }, (err, info) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({success: true});
  });
});

router.post('/api/v1/prayer-request-form', async (req, res) => {
  const { firstName, lastName, email, phone, prayerRequest, open } = req.body;
  let content = `${prayerRequest} | ${email}`;
  content += phone? ` | ${phone}` : ``;
  content += open === 't'? ' | 公開代禱事項' : ' | 不公開代禱事項';
  mailer.sendMail({
    from: GMAIL_ADDRESS,
    to: GMAIL_ADDRESS,
    subject: `Prayer Request from ${lastName} ${firstName}`,
    html: content
  }, (err, info) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({success: true});
  });
});

router.post('/api/v1/connection-form', async (req, res) => { 
  const { firstName, lastName, gender, email, phone, address, city, state, zip, status, age, about, ref } = req.body;
  let content = `姓名：${lastName} ${firstName}`;
  content += gender === 'm'? ' 先生' : ' 女士';
  content += ` | ${email}`;
  content += phone? ` | ${phone}` : ``;
  content += address? ` | ${address}` : ``;
  content += city? ` | ${city}` : ``;
  content += state? ` | ${state}` : ``;
  content += zip? ` | ${zip}` : ``;
  if (status) {
    switch (status) {
      case 'resident':
        content += ' | 定居';
        break;
      case 'newbie':
        content += ' | 新搬到這裡';
        break;
      case 'traveler':
        content += ' | 旅遊';
        break;
      default:
    }
  }
  if (age) {
    switch (age) {
      case '-20':
        content += ' | 20歲及以下';
        break;
      case '21-30':
        content += ' | 21-30歲';
        break;
      case '31-50':
        content += ' | 31-50歲';
        break;
      case '51+':
        content += ' | 51歲及以上';
        break;
      default:
    }
  }
  if (about.length > 0) {
    about.map(( item ) => {
      switch (item) {
        case 'christian':
          content += ' | 我已是基督徒';
          break;
        case 'prospect':
          content += ' | 我願意成為基督徒徒';
          break;
        case 'visit':
          content += ' | 我希望牧師前來探訪';
          break;
        default:
      } 
    });
  }
  content += ref? ` | 在教會的親友：${ref}` : ``;
  mailer.sendMail({
    from: GMAIL_ADDRESS,
    to: GMAIL_ADDRESS,
    subject: `Connection Card filled by ${lastName} ${firstName}`,
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

