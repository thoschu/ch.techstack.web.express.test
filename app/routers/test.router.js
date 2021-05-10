const express = require('express');
const router = express.Router();
const {testAction, testDeleteAction} = require('../controllers');

/**
 * @swagger
 *  definition:
 *      test:
 *          properties:
 *              id:
 *                  type: string
 */

/**
 * @swagger
 *  /test
 *      get:
 *          tags:
 *              - tests
 *          description: Returns all tests
 *          produces:
 *              - applicaton/json
 *              - application/xml
 *          responses:
 *              200:
 *                  description: An array of test datasets
 *                  schema:
 *                      $ref: '#/definitions/test'
 */

router.get('/', testAction);
router.get('/delete/:id?', testDeleteAction);

module.exports = router;
