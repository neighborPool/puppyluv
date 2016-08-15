// Dependencies
var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
// Schema
var OwnerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: {type: String, lowercase: true, unique: true},
  password: String,
  salt: String,
  age: Number,
  location: String,
  favorite: String,
  numberOfBreeds: Number,
  numberOfDogs: Number,
  dogs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Dog'}],
  messages: []
});

OwnerSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');

  this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

OwnerSchema.methods.validatePassword = function(password){
  var loginPassword = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.password === loginPassword;
};

OwnerSchema.methods.generatedJWT = function(){
  // set expiration to 60 days
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000)
  }, "SECRET");
};


// Return model
mongoose.model('Owner', OwnerSchema)