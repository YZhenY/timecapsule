const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const port = 3000;
const app = express();

app.use(morgan('dev'));

app.use(express.static(__dirname + 'dist'));

app.listen(port, function(err) {
    if (err) throw err;
    console.log('Listening on: ' + port);
})