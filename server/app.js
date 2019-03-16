const express = require('express');
const compression = require('compression');
const cors = require('cors');
// const morgan = require('morgan');
const path = require('path');
const db = require('../db/dataHelpers')
// const sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('./db/carousel.db');

const app = express();

app.use(compression());
app.use(cors());
// app.use(morgan('dev'));

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});

app.use(express.static('public'))

app.get('/api/item/:item_id/', function (req, res, next) {
  db.getImages(req.params.item_id, res)
  /*
  var {item_id} = req.params;
  db.all('SELECT img_url FROM images WHERE item_id=?', item_id, function(err, data) {
    if (err) {
      console.log(err);
    }
    res.send(data);
  })
  */
})

app.get('/*', (req, res) => {
  //send a response that includes html
  res.sendFile(path.join(__dirname, '../public/index.html'));
})

app.get('/loaderio-8f5b5940f2b67f5e77374713272da00f/', (req, res) => {
  res.sendFile(path.join(__dirname, './loaderVerification.txt'))
})

module.exports = app;

/*
app.get('/api/info/:item_id/', function (req, res) {
  var {item_id} = req.params;
  db.all('SELECT isMassdropMade FROM item WHERE item_id=?', item_id, function(err, data) {
    if (err) {
      console.log(err);
    }
    res.send(data);
  })
})*/