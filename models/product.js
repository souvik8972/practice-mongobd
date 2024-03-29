const { getdb } = require("../util/database")
const mongodb = require("mongodb")

class Product {
  constructor(title, price, imageUrl, description,id) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id=id
  }

  save() {
    const db = getdb();
    let dbOp;
    if(this._id){
      dbOp=db.collection("products").updateOne({_id:new mongodb.ObjectId(this._id)},{
        $set:this
      })

    }else{
      dbOp = db.collection('products').insertOne(this);

    }
  
    return dbOp.then(result => {
      console.log(result)
    }).catch(err => {
      console.log(err)
    })
  }


  static fetchAll() {
    const db = getdb();
    return db.collection("products").find().toArray().then(products => {
      console.log(products)
      return products
    }).catch(err => {
      console.log(err)
    })
  }


  static findById(prodId) {
    const db = getdb();
    return db.collection('products').find({ _id: new mongodb.ObjectId(prodId) }).next().then(product => {
      console.log(product);
      return product
    }).catch(err => console.log(err))

  }
  static deleteById(prodId) {

    const db=getdb()
    return db.collection('products').deleteOne({_id:new mongodb.ObjectId(prodId)}).then(result=>{
      console.log("DEleted")
    }).catch(err => {console.log(err)});
  }

}

// const sequelize = require('../util/database');

// const Product = sequelize.define('product', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

module.exports = Product;
