const swaggerJSDoc = require('swagger-jsdoc');

console.info('https://dev.to/kabartolo/how-to-document-an-express-api-with-swagger-ui-and-jsdoc-50do');

const swaggerDefinition = {
    info: {
        title: 'Test API',
        version: '1.0.0',
        description: 'API for testing purposes',
        license: {
            name: 'Licensed Under MIT',
            url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
            name: 'JSONPlaceholder',
            url: 'https://jsonplaceholder.typicode.com',
        }
    },
    openapi: '3.0.0',
    servers: [
        {
            url: 'https://localhost:8888',
            description: 'Development server',
        },
    ],
    host: 'localhost:8888',
    basePath: '/'
};

const options = {
    swaggerDefinition,
    apis: [
        './app/routers/test.router.js'
    ]
}

module.exports = swaggerJSDoc(options);
