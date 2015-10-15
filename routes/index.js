'use strict';

var express = require('express');
var router = express.Router();



// Serve out Angular
router.get('/', function(req, res, next) {
  console.log('get to /');
  res.render('index', {title: 'TITLE'});
});

router.get('/test', function(req, res) {
  res.send('GET to /test');
});


router.get('/add/:num1/:num2', function(req, res) {
  res.send((+req.params.num1 + +req.params.num2).toString())
});



module.exports = router;
