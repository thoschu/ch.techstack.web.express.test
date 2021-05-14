const express = require('express');
const router = express.Router();
const {tomAction} = require('../controllers');

/**
 *  @openapi
 *  /tom/:
 *      get:
 *          tags:
 *              - Tom
 *          description: Welcome to swagger-jsdoc!
 *          responses:
 *              200:
 *                  description: Returns a mysterious string.
 *          deprecated: true
 */
router.get('/', tomAction);

module.exports = router;
