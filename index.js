const cluster = require('cluster');
const os = require('os');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
const router = require('./app/routers');
const middleware = require('./app/middlewares');
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

    app.get('/', router.tomRouter);
    app.get('/.*\/test.*$/', (req, res) => res.redirect('/test'));

    app.use(middleware.testMiddleware);
    app.use('/test', router.testRouter);

    app.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    }));

    app.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}`);
    });

    console.log(`Worker ${process.pid} started`);
}
