// Dependencies
var express = require('express');
var router = express.Router();

// Models
var Owner = require('../models/owner');
var Messages = require('../models/message')

// Routes
Owner.methods(['get', 'put', 'post', 'delete']);

Owner.route('messages', function(req, res, next){
  res.send('Yeah bayabay!')

  next();
})

Owner.register(router, '/owners');

// Return router
module.exports = router;