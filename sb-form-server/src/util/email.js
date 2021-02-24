const nodemailer = require('nodemailer');
const path = require('path');
const juice = require('juice');
const assert = require('assert');
const submissionView = require('../jsdom/submissionView');
const ImageTools = require('./image-tools');

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

const resizeAttachments = async attachments => attachments.map(async (attachment) => {
  try {
    const header = attachment.path.split('base64,')[0];
    const base64 = attachment.path.split('base64,')[1];
    const imageData = Buffer.from(base64, 'base64');
    const resizedBuffer = await ImageTools.resizeImage(imageData, 800);
    return {
      ...attachment,
      path: `${header}base64,${resizedBuffer.toString('base64')}`
    };
  } catch (err) {
    console.error('Couldnt resize attachment', err);
    throw new Error('Couldnt resize attachment');
  }
});
module.exports = async (template, data) => {
  const { attachments, html } = await renderSubmission(template, data);
  const resizedAttachments = await Promise.all(await resizeAttachments(attachments));

  const styledHtml = await styleHtml(html);

  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      subject: process.env.MAIL_SUBJECT,
      html: styledHtml,
      attachments: resizedAttachments,
    };
    transporter.sendMail(mailOptions, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};
