const gm = require('gm').subClass({ imageMagick: true });


class ImageTools {
  constructor(buffer) {
    this.buffer = buffer;
  }

  static async resizeImage(buffer, size) {
    return new Promise((resolve, reject) => {
      gm(buffer).resize(size).toBuffer('JPEG', (err, newBuffer) => {
        if (err) reject(err);
        resolve(newBuffer);
      });
    });
  }

  async identify() {
    return new Promise((resolve, reject) => {
      gm(this.buffer).identify((err, details) => {
        if (err) reject(err);
        resolve(details);
      });
    });
  }

  async resize(size) {
    return new Promise((resolve, reject) => {
      gm(this.buffer).resize(size).toBuffer('JPEG', (err, buffer) => {
        if (err) reject(err);
        resolve(buffer);
      });
    });
  }
}

module.exports = ImageTools;

/*
const test = async (key) => {
  const S3 = require('./s3')
  var s3 = new S3('sb-transactionlog-outboundzipfilestorage-avantcard');
  console.log(key)
  const obj = await s3.getObjectRaw(key)
  const buff = Buffer.from(obj)
  const it = new ImageTools(buff)

  const fs = require('fs')
  console.log(await(it.identify()))
  const newFile = await(it.resize(800))
  fs.writeFileSync(`./${key}.jpg`, newFile)
  //gm(buff).identify((err, details) => {
//    console.log('before', details)
//    const newBuff = gm(buff).resize(800).toBuffer('JPEG', function(err, newBuff) {
//      gm(newBuff).identify((err, details) => {
  //      console.log('after', details)

    //  })

    //})

  //})


}

const bigTest =async () => {
  const Promise = require('bluebird')

  const keys = [
    '667d0674-0282-4a1c-bfe3-f1da1320d7e0',
    'fc4857e6-e754-45d4-8548-3892346be84a',
  'ceb23de0-725f-42da-8f97-d43799b87515',
'fa91dff0-b025-4174-aa1c-47f88b32bf9b',
'984716ad-cfbb-4bb5-aa96-7047cca28d9f']
  Promise.mapSeries(keys, async key => {
    const res = await test(key)
    //fs.writeFileSync(`./${key}`, res)
  })

}
bigTest()
*/
