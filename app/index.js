const express = require('express');
const app = express();

const PORT = 8888;

app.get('/', (req, res) => {
    console.log(req.method);
    console.log(req.get('cache-control'));
    res.cookie('foo', 'bar');
    res.status('200');
    res.send('Moin Valassis');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
