// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
// require the owner schema
var Owner = require('./models/owner')

// connect our database
mongoose.connect("mongodb://puppy:love@ds145315.mlab.com:45315/heroku_44lg18lr" || 'mongodb://localhost/cbb');


// Espress
var app = express();

// let's use bodyParser() to get data from a POST
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// Routes for our api:
// original code ends here update tomorrow if all is working uncomment the next line: and erase all of ====== new code ====== 
// app.use('/api', require('./routes/api'));

// === new code ===

var router = express.Router();

// add middleware to do something everytime a request is made: 
router.use(function(req, res, next){
  console.log('something is happening');
  // always add next();
  next();
})

// first route to make sure all is working
  router.get('/', function(req, res){
    res.json({message: 'horray! Welcome to our api!'})
  })

// more api routes wil happen here:

// on  routes that end in /owners
router.route('/owners')
  .post(function(req, res){
    var owner = new Owner();
    owner.firstName = req.body.firstName;
    owner.lastName = req.body.lastName;
    owner.age = req.body.age;
    owner.location = req.body.location;
    owner.favorite = req.body.favorite;
    owner.numberOfBreeds = req.body.numberOfBreeds;
    owner.numberOfDogs = req.body.numberOfDogs;
    owner.dogsName = req.body.dogsName;
    owner.dogsAge = req.body.dogsAge;
    owner.dogsBreed = req.body.dogsBreed;
    owner.dogsSex = req.body.dogsSex;
    owner.timesBread = req.body.timesBread;
    owner.dogHeight = req.body.dogHeight;
    owner.dogWeight = req.body.dogWeight;
    owner.dogAKCPapers = req.body.dogAKCPapers;
    owner.aboutDog = req.body.aboutDog;

    owner.save(function(err){
      if(err){
        res.send(err);
      }

      res.json({message: 'Owner created!'})
    });
  })
  .get(function(req, res){
    Owner.find(function(err, owners){
      if(err){
        res.send(err);
      }
      res.json(owners);
    });
  });

// on routes that end in /owners/:owner_id
router.route('/owners/:owner_id')
  .get(function(req, res){
    Owner.findById(req.params.owner_id, function(err, owner){
      if(err){
        res.send(err);
      }
      res.json(owner);
    })
    .put(function(req, res){
      Owner.findById(req.params.owner_id, function(err, owner){
        if(err){
          res.send(err);
        }

        owner.firstName = req.body.firstName;
        owner.lastName = req.body.lastName;
        owner.age = req.body.age;
        owner.location = req.body.location;
        owner.favorite = req.body.favorite;
        owner.numberOfBreeds = req.body.numberOfBreeds;
        owner.numberOfDogs = req.body.numberOfDogs;
        owner.dogsName = req.body.dogsName;
        owner.dogsAge = req.body.dogsAge;
        owner.dogsBreed = req.body.dogsBreed;
        owner.dogsSex = req.body.dogsSex;
        owner.timesBread = req.body.timesBread;
        owner.dogHeight = req.body.dogHeight;
        owner.dogWeight = req.body.dogWeight;
        owner.dogAKCPapers = req.body.dogAKCPapers;
        owner.aboutDog = req.body.aboutDog;
        // owner.messages =  []
      });
    });
  })
  .delete(function(req, res){
    Owner.remove({_id: req.params.owner_id}, function(err){
      if(err){
        res.send(err);
      }

      res.json({message: 'Successfully deleted'})
    })
  })
// Register our routes -------------
// all of our routes will be prefixed with the /api
app.use('/api', router);


// === end new code ===

// display our app here
app.use(express.static(__dirname + '/public'))

// set the port for our server
var port = process.env.PORT || 3000;
app.set('port', port);


// Start server
app.listen(port, function(){
  console.log('Server is up and running');
});