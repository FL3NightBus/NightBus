// BASE SETUP
// =============================================================================
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://oleh:tsi_o@ds043012.mongolab.com:43012/me');
var Route = require('./app/models/route');
var Comments = require('./app/models/routeC');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  return next();
});
var port = process.env.PORT || 8080; // set our port
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router
router.use(function(req, res, next) {
  console.log('Something is happening.');
  next();
});
//----------------comments-----------------
router.route('/comments')
  // create a new instance (accessed at GET http://localhost:8080/api/comments)
  .get(function(req, res) {
    Comments.find(function(err, comments) {
      if (err) res.send(err);
      res.jsonp(comments);
    });
  })
  .post(function(req, res) {
    var comment = new Comments(); // create a new instance of the Comments model
    comment.comments = req.query.comment; // set the routes name (comes from the request)
    comment.name = req.query.name;
    comment.time = req.query.time;
    comment.icon = req.query.icon;
    comment.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({
        message: 'Comment created!'
      });
    });
  });
// --------------routes--------------------------------------
var routesCoordinates = {};
router.route('/routes').get(function(req, res) {
  if (req.query.route) {
    var count = 2, //bus count
      arrOfCoordinates = [];
    Route.find({
      name: req.query.route
    }, function(err, rout) {
      if (err) res.send(err);
      var len = rout[0].routeArray.length;
      var name = rout[0].name;
      if (!(name in routesCoordinates)) {
        routesCoordinates[name] = Math.floor(Math.random() * len);
        for (var i = 1; i < count; i++) {
          routesCoordinates[name + i] = (routesCoordinates[name] + i * Math.floor(len / count)) % len;
        }
      };
      arrOfCoordinates.push(rout[0].routeArray[(routesCoordinates[name]) % len]);
      for (var i = 1; i < count; i++) {
        arrOfCoordinates.push(rout[0].routeArray[(routesCoordinates[name + i]) % len]);
      }
      res.jsonp(arrOfCoordinates);
    });
  } else {
    Route.find(function(err, routes) {
      if (err) res.send(err);
      res.json(routes);
    });
  }
}).post(function(req, res) {
  if (req.query.route) {
    var routes = new Route();
    routes.name = req.query.route;
    routes.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({
        message: 'Route created!'
      });
    });
  }
});
/*.put(function(req, res) {
  Route.findById(req.params.id, function(err, rout) {
    if (err) res.send(err);
    rout.name = req.body.name;
    rout.save(function(err) {
      if (err) res.send(err);
      res.json({
        message: 'Route updated!'
      });
    });
  });
});*/
setInterval(function() {
  for (i in routesCoordinates) {
    routesCoordinates[i]++;
  };
}, 5000);
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);