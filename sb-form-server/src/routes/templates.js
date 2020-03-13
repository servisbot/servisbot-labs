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

router.post('/:id/submission', (req, res) => {
  const { data } = req.body;
  email(req.params.id, data);
  res.status(200).send('ok');
});

module.exports = router;
