const express = require('express');
const router = express.Router();
const {testAction} = require('./controllers');

router.get('/', testAction);

module.exports = router;
