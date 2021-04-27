const express = require('express');
const router = express.Router();
const {testAction, testDeleteAction} = require('../controllers');

router.get('/', testAction);
router.get('/delete/:id?', testDeleteAction);

module.exports = router;
