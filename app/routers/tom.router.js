const express = require('express');
const router = express.Router();
const {tomAction} = require('../controllers');

router.get('/', tomAction);

module.exports = router;
