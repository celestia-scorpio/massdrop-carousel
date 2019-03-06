const fs = require('fs')
let writeStream = fs.createWriteStream('./data.txt')

for (let i = 0; i < 10; i++) {
  let images = []
  for (let j = 0; j < Math.ceil(Math.random() * 10) + 7; j++) {
    images.push(`https://s3.us-east-2.amazonaws.com/hr-sdc-massdrop-carousel/tech_product_images/pic${Math.ceil(Math.random() * 107)}.jpg`)
  }
  writeStream.write(JSON.stringify(images) + '\n')
}

writeStream.end()