const { Pool } = require('pg')
const configVars = require('./configVars')
var cluster = require('cluster')
// /var/lib/postgresql/10/main data directory

let user = configVars.user || 'ross' // process.env.USER
let host = configVars.host || 'localhost'
let database = configVars.database || process.env.USER 
let password = configVars.password || null
let port = configVars.port || 5432

const seed = async (dataFP, worker) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN;')
    await client.query(`COPY pics (urls) FROM '${dataFP}';`)
    await client.query('COMMIT;')
  } catch (e) {
    await client.query('ROLLBACK;')
    throw e
  } finally {
    client.release()
    worker.kill()
  }
}

// console.log('USER:', user)
const pool = new Pool({user, host, database, password, port})
// console.log('Pool:', pool)

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

if (cluster.isMaster) {
  var cpuCount = require('os').cpus().length

  for (var i = 0; i < cpuCount; i += 1) {
      cluster.fork()
  }
  async function makeTable() {
    const client = await pool.connect()
    // console.log('client finished trying to connect')
    try {
    await client.query('BEGIN;')
    await client.query(`DROP TABLE pics;`)
    await client.query(`CREATE TABLE pics (prod_id SERIAL PRIMARY KEY, urls JSONB);`)
    await client.query('COMMIT;')
    } catch (e) {
      await client.query('ROLLBACK;')
      throw e
    } finally {
      client.release()
    }
  }
  makeTable()
} else {
  const wkrId = cluster.worker.id
  console.log('worker id:', wkrId)
  
  seed(`/home/ross/Bootcamp/Galvanize/part2/SDC/massdrop-carousel/data${wkrId}.txt`, cluster.worker).catch(e => console.error(e.stack))
}

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