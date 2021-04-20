const express = require('express');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const app = express();
const router = require('./app/index');
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
    app.get('/', (req, res) => res.redirect('/test'));
    app.get('/.*\/test.*$/', (req, res) => res.redirect('/test'));

    app.use('/test', router);

    app.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}`);
    });

    console.log(`Worker ${process.pid} started`);
}
