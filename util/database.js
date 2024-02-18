const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;
require("dotenv").config()

let _db;
const mongoConnect=(callback)=>{
  MongoClient.connect(process.env.URI)
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


