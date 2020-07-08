const nodemailer = require('nodemailer');
const path = require('path');
const juice = require('juice');
const assert = require('assert');
const submissionView = require('../jsdom/submissionView');

assert.ok(process.env.MAIL_TO, 'Missing MAIL_TO environment variable');
assert.ok(process.env.MAIL_FROM, 'Missing MAIL_FROM environment variable');
assert.ok(process.env.SMTP_HOST, 'Missing SMTP_HOST environment variable');
assert.ok(process.env.SMTP_PORT, 'Missing SMTP_PORT environment variable');
assert.ok(process.env.SMTP_USER, 'Missing SMTP_USER environment variable');
assert.ok(process.env.SMTP_PASS, 'Missing SMTP_PASS environment variable');

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

const txOptions = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  // https://nodemailer.com/smtp/
  secure: false,
  tls: { rejectUnauthorized: false },
};
const transporter = nodemailer.createTransport(txOptions);

const renderSubmission = async (template, submission) => submissionView.render(template, submission);

module.exports = async (template, data) => {
  console.log(data);
  const { attachments, html } = await renderSubmission(template, data);
  const styledHtml = await styleHtml(html);

  return transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    subject: process.env.MAIL_SUBJECT,
    html: styledHtml,
    attachments,
  });
};
