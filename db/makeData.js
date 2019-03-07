const fs = require('fs')
const writeStream = fs.createWriteStream('./data.txt')
const cluster = require('cluster')

if (cluster.isMaster) {
  const cpuCount = require('os').cpus().length;

  for (var i = 0; i < cpuCount; i += 1) {
      cluster.fork()
  }

} else {

  for (let i = 0; i < 1000000; i++) {
    let images = []
    for (let j = 0; j < Math.ceil(Math.random() * 10) + 7; j++) {
      images.push(`https://s3.us-east-2.amazonaws.com/hr-sdc-massdrop-carousel/tech_product_images/pic${Math.ceil(Math.random() * 107)}.jpg`)
    }
    writeStream.write(JSON.stringify(images) + '\n')
  }

  writeStream.end()