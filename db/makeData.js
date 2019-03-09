const fs = require('fs')
const cluster = require('cluster')
const cpuCount = require('os').cpus().length

if (cluster.isMaster) {

  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork()
  }
} else {
  const wkrId = cluster.worker.id
  const writeStream = fs.createWriteStream(`./data${wkrId}.txt`)
  addData(writeStream, Math.ceil(10000000 / cpuCount))
}

function addData(writer, i) {
    let images = []
    let ok = true

    for (let j = 0; j < Math.ceil(Math.random() * 10) + 7; j++) {
      images.push(`https://s3.us-east-2.amazonaws.com/hr-sdc-massdrop-carousel/tech_product_images/pic${Math.ceil(Math.random() * 107)}.jpg`)
    }

    do {
      i--;
      if (i === 0) {
        // last time!
        writer.write(JSON.stringify(images))
        cluster.worker.kill()
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(JSON.stringify(images) + '\n')
      }
    } while (i > 0 && ok)
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', () => {
        addData(writer, i)
      })
    }
  }


/*
const makeFile = async () => {

  for (let i = 0; i < 4000000; i++) {
    let images = []
    for (let j = 0; j < Math.ceil(Math.random() * 10) + 7; j++) {
      images.push(`https://s3.us-east-2.amazonaws.com/hr-sdc-massdrop-carousel/tech_product_images/pic${Math.ceil(Math.random() * 107)}.jpg`)
    }
    writeStream.write(JSON.stringify(images) + '\n', () => {
    })
  }

  writeStream.end()
}
*/