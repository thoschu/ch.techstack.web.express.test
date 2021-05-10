const express = require('express');
const router = express.Router();
const {testAction, testDeleteAction} = require('../controllers');

/**
 *  @swagger
 *  definitions:
 *      test:
 *          properties:
 *              id:
 *                  type: number
 *                  format: int64
 *              title:
 *                  type: string
 *              active:
 *                  type: boolean
 */

/**
 *  @swagger
 *  /test:
 *      get:
 *          security:
 *              - bearerAuth: []
 *          tags:
 *              - tests
 *          description: Returns all tests
 *          summary: Foo bar baz
 *          produces:
 *              - application/json
 *              - application/xml
 *          responses:
 *              200:
 *                  description: An array of test datasets
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: integer
 *                              description: The user ID.
 *                          username:
 *                              type: string
 *                              description: The user name.
 *              400:
 *                  description: Bad request. User ID must be an integer and bigger than 0.
 *              401:
 *                  description: Authorization information is missing or invalid.
 *              404:
 *                  description: A user with the specified ID was not found.
 */

router.get('/', testAction);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 0
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 */
router.get('/delete/:id?', testDeleteAction);

module.exports = router;
