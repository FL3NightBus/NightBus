var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentsSchema = new Schema({
  time: Date,
  icon: String,
  name: String,
  comments: String
});
module.exports = mongoose.model('Comments', CommentsSchema);