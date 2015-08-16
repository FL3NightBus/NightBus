// app/models/rout.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RoutSchema = new Schema({
  name: String,
  info: {
  	route: String,
  	way: String,
  	price: String,
  	interval: String,
  	time: String,
  	sw: String,
  	bw: String
  },
  routeArray: [{
    lat: Number,
    lng: Number,
    busStop: String
  }]
});

module.exports = mongoose.model('Route', RoutSchema);