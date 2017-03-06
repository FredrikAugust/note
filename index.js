'use strict';

const express = require("express");

const app = express();

app.get('/', (req, res) => {
  res.send("Note");
})

app.listen(8888);
console.log("Listening on ::8888");
