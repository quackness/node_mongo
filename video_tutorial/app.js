const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const circulationRepo = require('./repos/circulationRepo')
const data = require('./circulation.json');

const dbName = 'circulation';

const url = "mongodb+srv://karo:karo@cluster0.wf4cdac.mongodb.net/circulation"

async function main() {
  // try {
  const client = new MongoClient(url, { useUnifiedTopology: true });
  await client.connect();
  try {
    const results = await circulationRepo.loadData(data);
    assert.equal(data.length, results.insertedCount);
    const getData = await circulationRepo.get();
    assert.equal(data.length, getData.length);
    const filterData = await circulationRepo.get({ Newspaper: getData[4].Newspaper });
<<<<<<< HEAD
    assert.equal(filterData[0], getData[4]);
    const limitData = await circulationRepo.get({}, 3);
    assert.equal(limitData.length, 3)
=======
    assert.deepEqual(filterData[0], getData[4]);
>>>>>>> 564d16e (add test change)
  } catch (error) {
    console.log(error)
  } finally {
    const admin = client.db(dbName).admin();
    await client.db(dbName).dropDatabase();
    // console.log(await admin.serverStatus());
    console.log(await admin.listDatabases());
    client.close();
  }
}

main();





