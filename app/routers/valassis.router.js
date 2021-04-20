const express = require('express');
const router = express.Router();
const {valassisAction} = require('../controllers');

router.get('/', valassisAction);

module.exports = router;
