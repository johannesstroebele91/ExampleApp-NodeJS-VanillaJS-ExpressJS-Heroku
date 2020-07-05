const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const serverless = require('serverless-http');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));

// Routing
app.use(express.static(__dirname +'/.netlify/functions/pages',{index: false,extensions:['html']}));
app.use(express.static(path.join(__dirname, '/.netlify/functions/')));

module.exports = app;
module.exports.handler = serverless(app);
