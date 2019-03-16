const { Pool } = require('pg')
const connectionVars = {
  user: 'ross', 
  host: 'ec2-18-222-28-246.us-east-2.compute.amazonaws.com',
  database: 'SDC_pictures', 
  password: 'polywoggysudo', 
  port: 5432
}

const pool = new Pool(connectionVars)

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

module.exports = {
  getImages: async (id, res) => {
    try {
      const {rows} = await pool.query('SELECT * FROM pics WHERE prod_id = $1', [id])
      res.send(rows)
    } catch (e) {
      console.log(e)
      res.sendStatus(404)
    } 
  }
}



/*
var helpers = {
  imagePush: function() {
    var images = []
    for (var i = 1; i < 20; i++) {
      if (i < 5) {
        images.push(`https://s3.us-east-2.amazonaws.com/massdrop-carousel/img${i}.png`)
      } else if (i === 17) {
        images.push(`https://s3.us-east-2.amazonaws.com/massdrop-carousel/img17.jpeg`)
      } else {
        images.push(`https://s3.us-east-2.amazonaws.com/massdrop-carousel/img${i}.jpg`)
      }
    }
    return images;
  },
  generateRandomNumber: function() {
    return Math.floor((Math.random() * 16) + 5);
  },
}

module.exports = helpers;
*/