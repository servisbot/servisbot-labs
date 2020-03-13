const express = require('express');

const router = express.Router();

router.get('/:id', (req, res) => {
  res.render('form', { title: 'sb-form-server', formName: req.params.id });
});

module.exports = router;
