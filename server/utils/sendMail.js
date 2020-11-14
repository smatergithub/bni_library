const fs = require('fs');
const mustache = require('mustache');
const nodemailer = require('nodemailer');
const config = {
  service: 'gmail',
  auth: {
    user: 'e.bni.library@gmail.com',
    pass: 'Jakarta19!',
  },
};

module.exports = {
  async sendMailRegister(payload) {
    const template = fs.readFileSync('./server/utils/template.html', 'utf8');
    const transporter = await nodemailer.createTransport(config);
    const mail = {
      to: payload.email,
      from: 'e.bni.library@gmail.com',
      subject: '[BNI LIBRARY] - Email Konfirmasi !',
      html: mustache.render(unescape(template), { ...payload }),
    };
    transporter
      .sendMail(mail)
      .then(res => {
        console.log('======');
      })
      .catch(err => {
        console.log(err);
      });
  },
  async sendResetPasswordLink(payload) {
    const template = fs.readFileSync('./server/utils/template.html', 'utf8');
    const transporter = await nodemailer.createTransport(config);
    const mail = {
      to: payload.email,
      from: 'e.bni.library@gmail.com',
      subject: '[BNI LIBRARY] - Password Reset!',
      html: mustache.render(unescape(template), { ...payload }),
    };
    transporter
      .sendMail(mail)
      .then(res => {
        console.log('======');
      })
      .catch(err => {
        console.log(err);
      });
  },
  async sendFeedback(payload) {
    const template = fs.readFileSync('./server/utils/feedback.html', 'utf8');
    const transporter = await nodemailer.createTransport(config);
    const mail = {
      to: 'darvinsinaga12@gmail.com',
      from: 'e.bni.library@gmail.com',
      subject: '[BNI LIBRARY] - Feedback',
      html: mustache.render(unescape(template), { ...payload }),
    };
    transporter
      .sendMail(mail)
      .then(res => {
        console.log('======');
      })
      .catch(err => {
        console.log(err);
      });
  },
};
