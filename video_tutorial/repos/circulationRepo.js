const { MongoClient } = require('mongodb');

function circulationRepo() {
  const url = "mongodb+srv://karo:karo@cluster0.wf4cdac.mongodb.net/circulation"
  const dbName = 'circulation';

  function get(query) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url, { useUnifiedTopology: true });
      try {
        await client.connect();
        const db = client.db(dbName);
        let items = db.collection('newspapers').find(query);
        resolve(await items.toArray());
        client.close();
      } catch (error) {
        reject(error)
      }
    })

  }

  function loadData(data) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url, { useUnifiedTopology: true });
      try {
        await client.connect();
        const db = client.db(dbName);
        results = await db.collection('newspapers').insertMany(data);
        resolve(results);
        client.close();
      } catch (error) {
        reject(error)
      }
    })
  }
  return { loadData, get }
}

module.exports = circulationRepo();


