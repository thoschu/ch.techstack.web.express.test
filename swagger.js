const swaggerJSDoc = require('swagger-jsdoc');

console.info('https://dev.to/kabartolo/how-to-document-an-express-api-with-swagger-ui-and-jsdoc-50do');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Test API',
        version: '1.0.0',
        description: 'API for testing purposes',
        license: {
            name: 'Licensed Under MIT',
            url: 'https://opensource.org/licenses/MIT',
        },
        contact: {
            name: 'Tom S.',
            url: 'https://www.thomas-schulte.de/disclaimer.html',
        }
    },
    servers: [
        {
            url: 'https://localhost:8888',
            description: 'Development server 1',
        }, {
            url: 'https://localhost:8899',
            description: 'Development server 2',
        }
    ],
    host: 'localhost:8888',
    basePath: '/'
};

const options = {
    swaggerDefinition,
    apis: [
        './app/routers/test.router.js'
    ]
};

module.exports = swaggerJSDoc(options);
