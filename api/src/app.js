const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const middleware = require('./middleware');

const app = express();

app.use(cors());
app.use(middleware.validateHeaders);

app.use('/api', routes);

module.exports = app;
