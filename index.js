'use strict';

let express = require("express");
let morgan = require("morgan");
let bodyParser = require("body-parser");

const app = express();

let port = 8888;

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('tiny'));
}

app.use(bodyParser.json({ type: 'application/json' }));

app.get('/', (req, res) => {
  res.json({"info": "Welcome!"});
})

app.listen(port);

module.exports = app;
