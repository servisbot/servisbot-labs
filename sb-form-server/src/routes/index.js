const express = require('express');

const router = express.Router();

router.get('/health', (req, res) => {
  res.send('ok');
});

router.get('/thanks', (req, res) => {
  res.render('thanks', { title: 'Thanks' });
});

module.exports = router;
