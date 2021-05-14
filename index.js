const cluster = require('cluster');
const http2 = require('spdy');
const os = require('os');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');

const app = express();
const router = require('./app/routers');
const middleware = require('./app/middlewares');
const swaggerSpec = require('./swagger/swagger');
const PORT = 8888;

if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    // Construct a schema, using GraphQL schema language
    const schema = buildSchema(`
        type Query {
            hello: String
        }
    `);

    // The root provides a resolver function for each API endpoint
    const root = {
        hello: () => {
            return 'Hello world!';
        }
    };

    // create a write stream (in append mode)
    const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

    app.use(middleware.testMiddleware);
    app.use(morgan('combined', {immediate: true, stream: accessLogStream}));
    app.use(express.static(`${__dirname}/app/static`));
    app.use('/test', router.testRouter);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    }));

    app.get('/', router.tomRouter);
    app.get('/.*\/test.*$/', (req, res) => res.redirect('/test'));

    // app.listen(PORT, () => {
    //     console.log(`Server listening on http://localhost:${PORT}`);
    // });

    const options = {
        key: fs.readFileSync('./localhost8888.key'),
        cert: fs.readFileSync('./localhost8888.cert')
    };

    http2.createServer(options, app).listen(PORT, () => {
        console.log(`Server listening on https://localhost:${PORT}`);
    });

    console.log(`Worker ${process.pid} started ${__dirname}/app/static`);
}

// 'use strict';
//
// module.exports = {
//     build: require('./build'),
//     metadata: require('./metadata'),
//     options: require('./options')
// };
