const express = require('express');
const router = require('./routes/index');

const port = process.env.PORT || 5000;
const app = express();

app.use(router);
app.listen(port, () => console.log('We are live on port: ', port));
