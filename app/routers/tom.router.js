const express = require('express');
const router = express.Router();
const {tomAction} = require('../controllers');

/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/', tomAction);

module.exports = router;
