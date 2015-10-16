'use strict';

var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var uuid = require('node-uuid');
var multer = require('multer');
var upload = multer({ storage: multer.memoryStorage() });
var File = require('../models/File');

router.post('/', upload.single('photo'), function(req, res) {
  console.log(req.file);
  var bucketName = process.env.AWS_BUCKET;
  var keyName = uuid.v4() + '.jpg';

  var params = { Bucket: bucketName, Key: keyName, Body: req.file.buffer, ACL: 'public-read' };
  s3.putObject(params, function(err, data) {
    if (err){
      console.log(err);
      res.status(400).json({error: err});
    } else {
      console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
      console.log('data:', data);
      var newFile = new File({url: ['https://s3-us-west-2.amazonaws.com/bucket-o-jameela/' + params.Key]});
      newFile.save(function(err, savedFile){
      })
    }
  });



});

router.get('/', function(req, res) {
  console.log("getting files:");
  File.find({}, function(err, File) {
    console.log(File);
    res.send(err || File);
  });
});

module.exports = router;

//https://s3-us-west-2.amazonaws.com/bucket-o-jameela/634e8443-e6f3-4f6a-8d95-22086a30a1a0.jpg