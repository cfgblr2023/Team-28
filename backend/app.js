const express = require('express');
const app = express();

app.use(express.json());

const userRoute = require('./routes/userRoute.js');

app.use('/api/users', userRoute);


module.exports = app;