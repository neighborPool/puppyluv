// Dependencies
// no longer using node restful delete next two lines if all works well!
// var restful = require('node-restful');
// var mongoose = restful.mongoose;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// we may still need to reference teh message model. May need to delete if all works well!
// var messageSchema = require('./message')

// Schema
var ownerSchema = new Schema({
  firstName: String,
  lastName: String,
  age: Number,
  location: String,
  favorite: String,
  numberOfBreeds: Number,
  numberOfDogs: Number,
  dogsName: String,
  dogsAge: Number,
  dogsBreed: String,
  dogsSex: String,
  timesBread: Number,
  dogHeight: String,
  dogWeight: Number,
  dogAKCPapers: String,
  aboutDog: String,
  messages: []
});

// old code here: delete if all works well
// module.exports = restful.model('Owners', ownerSchema)

module.exports = mongoose.model('Owner', ownerSchema)