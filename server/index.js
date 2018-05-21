const express = require('express');
const app = express();
const mongoose = require('mongoose');

const keys = require('./config/keys');
const restRouter = require('./routes/rest');

mongoose.connect(keys.mongoURI);

app.use('/api/v1', restRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
