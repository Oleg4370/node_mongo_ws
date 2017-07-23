const MongoClient = require('mongodb').MongoClient;

let state = { //there we can save all data that need to work with our database
  db: null
};

exports.connect = function (url, done) {
    if(state.db){
        return done();
    }
    MongoClient.connect(url, function (err, database) {
        if(err){
            return done(err);
        }
        state.db = database;
        done();
    })
};

exports.get = function () {
  return state.db;
};