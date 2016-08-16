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
  .put(function(req,res){
  	console.log('this is the put request for user', req.body)
  	res.json(req.body)
  })
  .get(function(req, res){
    Owner.find(function(err, owners){
      if(err){
        res.send(err);
      }
      res.json(owners);
    });
  });

// ===== messages route ======

router.route('/owners/:owner_id/messages')
  .get(function(req, res){
    Owner.findById(req.params.owner_id,
      function(err, owner){
        if(err){
          res.send(err)
        }
        res.json(owner)
      });
  })
  .put(function(req, res){
    // console.log(':::put is working:::')
    // console.log('Body data',req.body)
    // console.log('req.params', req.params)

    Owner.update({_id:req.params.owner_id}, {$push: {messages:req.body}

}, function(err, owner){
      res.send(owner)
    });
  });

// ===== end messages route =====

router.param('owner', function(req, res, next, id){
	var query = Owner.findById(id);

	query.exec(function(err, owner){
		if (err) { return next(err); }
		if (!owner) { return next(new Error('Can\'t find owner')); }

		req.owner = owner;
		return next();
	});
});

router.get('/owners/:owner', function(req, res){
	req.owner.populate('dogs', function(err, dog){
		if (err) { return err}
		res.json(dog);
	})
}); 

// on routes that end in /owners/:owner_id
router.route('/owners/:owner_id')

  .get(function(req, res, next){
    Owner.findById(req.owner.id, function(err, owner){
      if(err){ return next(err); }
      res.json(owner);
    })

    .put(function(req, res, next){
    	
      Owner.findById(req.owner.id, function(err, owner){
        if(err){ return next(err); }

        owner.firstName = req.body.firstName;
        owner.lastName = req.body.lastName;
        owner.age = req.body.age;
        owner.location = req.body.location;
        owner.favorite = req.body.favorite;
        owner.numberOfBreeds = req.body.numberOfBreeds;
      });
    });
  })

  .delete(function(req, res, next){
    console.log('running the delete');
    Owner.remove({_id: req.params.owner_id}, function(err){
      if(err){ return next(err); }

      res.json({message: 'Successfully deleted'})
    })
  })


router.post('/posts/:owner/dogs', function(req, res, next){
	var dog = new Dog(req.body);
	console.log('this is req.post ======+++++', req.owner)
	dog.owner = req.owner;
	dog.save(function(err, dog){
		if (err) { return next(err); }
		req.owner.comments.push(dog);
		req.owner.save(function(err, dog){
			if (err) { return next(err)}
			res.json(comment);
		});
	});
});


router.post('/signup', function(req, res, next){
	console.log('hittin the server')
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }
  var user = new Owner();
  console.log(user);
  user.username = req.body.username;
  user.setPassword(req.body.password)
  user.save(function (err){
    if(err){ return next(err); }
    return res.json({token: user.generateJWT()})
  });
});

router.post('/login', function(req, res, next){
	console.log('test for login post++++=', req.body);

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