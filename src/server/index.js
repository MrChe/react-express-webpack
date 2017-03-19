const http = require('http');
const express = require('express');
const setupApplicationApi = require('./middlewares/api');

process.env.APP_PORT = process.env.APP_PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();

// apply application API
setupApplicationApi(app);

// middlewares
if (process.env.NODE_ENV === 'development') {
  require('./middlewares/development')(app);
} else {
  require('./middlewares/production')(app);
}

http.createServer(app).listen(process.env.APP_PORT, () => {
  console.log(`HTTP server is now running on http://localhost:${process.env.APP_PORT}`);
});