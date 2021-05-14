const express = require('express');
const router = express.Router();
const {testAction, testDeleteAction} = require('../controllers');

/**
 *  @openapi
 *  components:
 *      headers:
 *          Location:
 *              description: URI der neu erzeugten Ressource
 *              schema:
 *                  type: string
 *                  format: uri
 *      parameters:
 *          Mid:
 *              name: mid
 *              in: path
 *              required: true
 *              schema:
 *                  type: integer
 *              description: Id des Modells
 *          Wid:
 *              name: wid
 *              in: path
 *              required: true
 *              schema:
 *                  type: integer
 *                  description: Id des Werks
 *          Limit:
 *              name: limit
 *              in: query
 *              required: false
 *              schema:
 *                  type: integer
 *                  format: int64
 *                  minimum: 1
 *      responses:
 *          Modell:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Modell'
 *              links:
 *                  Werk:
 *                      operationId: /test/werke/{wid}/
 *                      parameters:
 *                          wid: $response.body#/werk
 *          Werk:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Werk'
 *      requestBodies:
 *          Modell:
 *              description: Modell post request body example
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Modell'
 *      schemas:
 *          Modell:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      format: int64
 *                      example: 1377
 *                  name:
 *                      type: string
 *                      maxLength: 20
 *                      example: Modell 7
 *                  werk:
 *                      type: integer
 *                      example: 325
 *          ModellItem:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  self_uri:
 *                      type: string
 *                      format: uri
 *              example:
 *                  name: ID.3
 *                  self_uri: /modell/77
 *          Werk:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      format: int64
 *                      example: 1977
 *                  name:
 *                      type: string
 *                      maxLength: 10
 *                      example: Hamburg
 *      securitySchemes:
 *          prod:
 *              scheme: bearer
 *              type: http
 *              bearerFormat: jwt
 *          keycloak:
 *              type: oauth2
 *              flows:
 *                  implicit:
 *                      authorizationUrl: https://iam-dev.ingress1.dev-lbobka.de-1.mk.psmanaged.com/auth/realms/cx-portal/protocol/openid-connect/auth
 *                      scopes: {}
 */

/**
 *  @openapi
 *  /test/:
 *      post:
 *          tags:
 *              - Test
 *          summary: Modell erzeugen
 *          description: |
 *              ![ts icon](https://www.thomas-schulte.de/html/images/favicon.ico)
 *
 *              Erzeugt ein **neues** Modell
 *
 *              |A|B|C|
 *              |---|---|---|
 *              |1|2|3|
 *          requestBody:
 *              $ref: '#/components/requestBodies/Modell'
 *          responses:
 *              201:
 *                  description: Created
 *                  headers:
 *                      Location:
 *                          $ref: '#/components/headers/Location'
 *          security:
 *              - keycloak: []
 *      get:
 *          tags:
 *              - Test
 *          summary: Modelle wiedergeben
 *          description: Gibt alle Modelle als Liste zurück
 *          parameters:
 *              - $ref: '#/components/parameters/Limit'
 *          responses:
 *              200:
 *                  description: OK
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/ModellItem'
 *              401:
 *                  description: Not authenticated
 *              403:
 *                  description: Access token does not have the required scope
 */
router.get('/', testAction);
router.post('/', testAction);

/**
 *  @openapi
 *  /test/{mid}/:
 *      parameters:
 *          - $ref: '#/components/parameters/Mid'
 *      get:
 *          tags:
 *              - Test
 *          summary: Modell wiedergeben nach Modell id
 *          description: Gibt ein Modell gem. Modell-Id zurück
 *          responses:
 *              200:
 *                  $ref: '#/components/responses/Modell'
 *      put:
 *          tags:
 *              - Test
 *          summary: Modell verändern
 *          description: Verändert ein Modell gem. Modell-Id
 *          requestBody:
 *              $ref: '#/components/requestBodies/Modell'
 *          responses:
 *              200:
 *                  $ref: '#/components/responses/Modell'
 *      delete:
 *          tags:
 *              - Test
 *          summary: Modell löschen nach modell id
 *          description: Löscht ein Modell gem. Modell-Id zurück
 *          responses:
 *              200:
 *                  description: OK
 */
router.get('/:mid', testAction);
router.put('/:mid', testAction);
router.delete('/:mid', testAction);

/**
 *  @openapi
 *  /test/werke/{wid}/:
 *      parameters:
 *          - $ref: '#/components/parameters/Wid'
 *      get:
 *          tags:
 *              - Werk
 *          summary: Foo
 *          description: bar baz
 *          operationId: /test/werke/{wid}/
 *          responses:
 *              200:
 *                  $ref: '#/components/responses/Werk'
 */
router.get('werke/:wid', testAction);

router.get('/delete/:id?', testDeleteAction);

module.exports = router;
