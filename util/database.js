const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect=(callback)=>{
  MongoClient.connect("mongodb+srv://souvik:1234@cluster3.xtlriis.mongodb.net/new?retryWrites=true&w=majority")
    .then(client => { 
      console.log("connected") ;
      _db=client.db()
      callback()
  
  
  })
    
    .catch(err => {
      console.log(err)
    })
}

const getdb=()=>{
  if(_db){
    return _db
  }
  throw "no database connection"
}

exports.mongoConnect=mongoConnect
exports.getdb=getdb


