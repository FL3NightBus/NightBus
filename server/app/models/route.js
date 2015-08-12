// app/models/rout.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RoutSchema = new Schema({
  name: String,
  routeArray: [{
    lat: Number,
    lng: Number,
    busStop: String
  }]
});

module.exports = mongoose.model('Route', RoutSchema);