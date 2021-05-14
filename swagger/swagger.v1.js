const swaggerJSDoc = require('swagger-jsdoc');

console.info('https://dev.to/kabartolo/how-to-document-an-express-api-with-swagger-ui-and-jsdoc-50do');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Test API',
        version: '1.3.7',
        description: '![ts icon](https://www.thomas-schulte.de/html/images/favicon.ico) Test API Beschreibung by **Tom S.** - with ❤ in Hamburg/Germany 😂',
        termsOfService: 'https://www.thomas-schulte.de/disclaimer.html',
        license: {
            name: 'Licensed Under MIT',
            url: 'https://opensource.org/licenses/MIT',
        },
        contact: {
            name: 'Tom S.',
            url: 'https://www.thomas-schulte.de/start.html',
            email: 'thoschulte@gmail.com'
        }
    },
    servers: [
        {
            url: 'https://localhost:8888',
            description: 'Development server 1',
        }, {
            url: 'https://8.8.8.8:8888',
            description: 'Development server 2',
        }
    ],
    host: 'localhost:8888',
    basePath: '/v1/',
    externalDocs: {
        description: 'Find out more',
        url: 'https://www.thomas-schulte.de'
    }
};

const options = {
    swaggerDefinition,
    apis: [
        './app/routers/test.router.js',
        './app/routers/tom.router.js'
    ]
};

module.exports = swaggerJSDoc(options);
