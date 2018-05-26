const express = require('express');
const app = express();
const mongoose = require('mongoose');
const http = require('http');
const io = require('socket.io')();

const socketService = require('./services/socketService')(io);
const keys = require('./config/keys');
const restRouter = require('./routes/rest');

mongoose.connect(keys.mongoURI);

app.use('/api/v1', restRouter);

const PORT = process.env.PORT || 5000;
// app.listen(PORT);

const server = http.createServer(app);
io.attach(server);
server.listen(PORT);

const onError = err => {
  throw err;
}

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe' + addr : 'port' + addr.port;
  console.log('Listening on ' + bind);
}

server.on('error', onError);
server.on('listening', onListening);

