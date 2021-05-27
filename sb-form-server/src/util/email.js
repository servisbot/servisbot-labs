const nodemailer = require('nodemailer');
const path = require('path');
const juice = require('juice');
const assert = require('assert');
const submissionView = require('../jsdom/submissionView');

assert.ok(process.env.MAIL_TO, 'Missing MAIL_TO environment variable');
assert.ok(process.env.MAIL_FROM, 'Missing MAIL_FROM environment variable');
assert.ok(process.env.SMTP_HOST, 'Missing SMTP_HOST environment variable');
assert.ok(process.env.SMTP_PORT, 'Missing SMTP_PORT environment variable');

const styleHtml = async html => new Promise((resolve, reject) => {
  try {
    juice.juiceResources(
      html,
      {
        webResources: { relativeTo: path.resolve('public') },
      },
      async (err, result) => {
        resolve(result);
      }
    );
  } catch (err) {
    reject(err);
  }
});

let txOptions;
// Authenticated SMTP
if (process.env.SMTP_USER && process.env.SMTP_PASS) {
  txOptions = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    secure: false,
    tls: { rejectUnauthorized: false },
  };
} else {
  // Anonymous (auth at source)
  txOptions = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    tls: { rejectUnauthorized: false },
  };
}
const transporter = nodemailer.createTransport(txOptions);

const renderSubmission = async (template, submission) => submissionView.render(template, submission);


const sendEmail = async (attachments, html, emailTo) => {
  const styledHtml = await styleHtml(html);
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: emailTo,
      subject: process.env.MAIL_SUBJECT,
      html: styledHtml,
      attachments,
    };
    transporter.sendMail(mailOptions, (err, res) => {
      if (err) {
        console.error('error SendMail', err);
        if (err.message.includes('Message exceeded max message size')) {
          reject(new Error(process.env.SUBMISSION_TOO_LARGE_TO_EMAIL));
          return;
        }
        reject(new Error(process.env.SUBMISSION_FAILED_TO_EMAIL));
      }
      resolve(res);
    });
  });
};

const getEmailToAddress = (envVar) => {
  if (process.env[envVar]) {
    return process.env[envVar];
  }
  return process.env.MAIL_TO;
};

module.exports = {
  sendEmail,
  renderSubmission,
  getEmailToAddress
};
