

// const { Pool } = require('pg')
// const configVars = require('./configVars')
// /var/lib/postgresql/10/main data directory
/*
const Promise = require('bluebird')
const initOptions = {promiseLib: Promise, capSQL: true}
const pgp = require('pg-promise')(initOptions)
const configVars = require('./configVars')

const cn = {
  host: configVars.host || 'localhost',
  port: configVars.port || 5432,
  database: configVars.database || 'SDC_pictures',
  user: configVars.user || 'postgres',
  password: configVars.password || null
}

const db = pgp(cn)

db.task(t => {
  return t.batch([
      t.one('insert into users(name) values($1) returning id', 'John'),
      t.one('insert into events(code) values($1) returning id', 123)
  ]);
})
  .then(([user, event]) => {
      // print new user id + new event id;
      console.log('DATA:', user.id, event.id)
  })
  .catch(error => {
      console.log('ERROR:', error)
  })
  .finally(db.$pool.end)
*/
/*
let user = configVars.user || process.env.USER || 'ross'
let host = configVars.host || 'localhost'
let database = configVars.database || process.env.USER 
let password = configVars.password || null
let port = configVars.port || 5432

const pool = new Pool({user, host, database, password, port})
console.log('Pool:', pool)
(async (() => {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    await client.query(`CREATE TABLE IF NOT EXISTS pics (urls JSONB);`)
    await client.query(`COPY pics (urls) FROM PROGRAM 'node ./makeData.js' `)

    await client.query('COMMIT')
  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  } finally {
    client.release()
  }
}))().catch(e => console.error(e.stack))
*/
/*
const faker = require('faker');
const {imagePush, generateRandomNumber} = require('./dataHelpers.js');
const sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./carousel.db');

db.run(`CREATE TABLE item (item_id INTEGER PRIMARY KEY AUTOINCREMENT, item_name VARCHAR, isMassdropMade BOOLEAN)`);
db.run(`CREATE TABLE images (image_id INTEGER PRIMARY KEY AUTOINCREMENT, img_url VARCHAR, item_id INTEGER, FOREIGN KEY (item_id) REFERENCES item(item_id))`);
db.serialize(function() {
  
  for (var k = 1; k < 101; k++) {
    var itemVals = faker.commerce.productName();
    var bool = Math.round(Math.random());
    db.run(`INSERT INTO item(item_name, isMassdropMade) VALUES(?, ?)`,[itemVals, bool], function(err) {
      if (err) {
        console.log('encountered error in item seeding', err);
      }
    });
  }
  
  var imagesArr = imagePush();
  for (var i = 1; i < 101; i ++) {
    var genIndex = generateRandomNumber();
    var images = imagesArr.slice(0, genIndex);
    for (var j = 0; j < images.length; j++) {
      db.run(`INSERT INTO images(img_url, item_id) VALUES(?, ?)`,[images[j], i], function(err) {
        console.log('encountered error in image seeding', err);
      });
    }
  }
  db.close();
})
*/