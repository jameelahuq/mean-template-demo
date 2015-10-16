'use strict';

var mongoose = require('mongoose');

var FileSchema = new mongoose.Schema({
  //filename: {type: String, unique: true},
  url: {type: String, lowercase: true, unique: true, required: true},
  user: {type: Mongoose.Schema.ObjectId, ref: "User", required: true}

});


module.exports = mongoose.model('File', FileSchema);

