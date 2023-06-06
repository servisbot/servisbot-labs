const express = require('express');

const router = express.Router();
const email = require('../util/email');
const templates = require('../util/templates');

router.get('/:id', async (req, res) => {
  const formName = req.params.id;
  const formPath = await templates.getTemplateFile(formName);

  if (!formPath) {
    res.status(404).send(`Form '${formName}' not found`);
  }

  res.sendFile(formPath, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
});

router.post('/:id/submission', async (req, res) => {
  const { data } = req.body;
  let error = null;
  try {
    const { attachments, html } = await email.renderSubmission(req.params.id, data);
  } catch (e) {
    console.error('Email rendering failed', error);
    error = e;
  }
  try {
    if(e)
    {
      console.log('Attempting to send raw form to admin');
      await email.sendAdminEmail(e.message, data);
      res.status(500).send(e.message);
    }
    else
    {
      const { MAIL_TO } = data;
      const emailTo = email.getEmailToAddress(MAIL_TO);
      await email.sendEmail(attachments, html, emailTo);
      res.status(200).send('ok');
    }
  } catch (error) {
    console.error('Error sending email', error);
    res.status(400).send(error.message);
  }
});

module.exports = router;
