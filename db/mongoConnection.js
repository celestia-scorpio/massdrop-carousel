var cluster = require('cluster')

if (cluster.isMaster) {

  // Count the machine's CPUs
  var cpuCount = require('os').cpus().length;

  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {
      cluster.fork()
  }

// Code to run if we're in a worker process
} else {
  console.log('worker id:', cluster.worker.id)
  const wkrId = cluster.worker.id
  const MongoClient = require('mongodb').MongoClient
    , assert = require('assert') 
  const url = 'mongodb://localhost:27017'
  const dbName = 'carouselPics';
  const client = new MongoClient(url);
  let docNum = 200000
  let i = docNum * wkrId - docNum + 1

  cluster.worker.on('exit', function (code, signal) {
    console.log('child process exited with ' + `code ${code} and signal ${signal}`)
  })

  client.connect(function(err) {
    assert.equal(null, err)
    console.log("Connected successfully to server") 
    let pics = []
    for (i; i <= docNum * wkrId; i++) {
      let urls = []
      for (let j = 0; j < Math.ceil(Math.random() * 10) + 7; j++) {
        urls.push(`https://s3.us-east-2.amazonaws.com/hr-sdc-massdrop-carousel/tech_product_images/pic${Math.ceil(Math.random() * 107)}.jpg`)
      }
      pics.push({"prod_id": i, urls: urls})
    }
    const db = client.db(dbName)

    db.collection('pics').insertMany(pics, function(err, r) {
      assert.equal(null, err)
      assert.equal(docNum, r.insertedCount)
      cluster.worker.kill()
      client.close()
    })
  })
}
