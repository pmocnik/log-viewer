const express = require('express');
const app = express();
const api = require('./Api/api.js');
const port = process.env.port || 3000;
const path = require('path');
var cors = require('cors');

app.use(cors());

app.use("/", express.static(path.join(__dirname, 'log-viewer-gui/build')));

app.use('/api', api);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})