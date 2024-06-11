const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;
const uri = process.env.MONGO_DB_URI;

const mongoConnect = (cb) => {
  MongoClient.connect(uri)
    .then((client) => {
      console.log("Connected to database!");
      _db = client.db();
      cb();
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found";
};

module.exports = { mongoConnect, getDb };
