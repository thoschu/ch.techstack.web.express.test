const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const express = require('express');

const app = express();
const router = require('./app/routers');
const PORT = 8888;

if (cluster.isMaster) {
    console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    app.get('/', router.valassisRouter);
    app.get('/.*\/test.*$/', (req, res) => res.redirect('/test'));

    app.use('/test', router.testRouter);

    app.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}`);
    });

    console.log(`Worker ${process.pid} started`);
}
