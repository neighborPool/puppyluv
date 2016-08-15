// Dependencies
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');
// Models
var Owner = mongoose.model('Owner');
var Messages = mongoose.model('Dog')

// Routes

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
    owner.username = req.body.username;
    owner.password = req.body.password;
    

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


router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.username = req.body.username;

  user.setPassword(req.body.password)

  user.save(function (err){
    if(err){ return next(err); }

    return res.json({token: user.generateJWT()})
  });
});

router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
})

// Return router
module.exports = router;