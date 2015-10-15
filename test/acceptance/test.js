/**
 * Created by HUQ on 10/14/15.
 */
'use strict';

//documentation from https://github.com/visionmedia/supertest
//NOTE: this does not function!!

require('dotenv').load();
var app = require('../../app.js');

var SuperTest = require('supertest'),
    Express = require('express');


//app.get('/user', function(req, res){
//  res.send(200, { name: 'tobi' });
//});

describe('GET /test', function(){
  it('respond with json', function(done) {
    SuperTest(app)
        .get('/test')
        .set('Accept', 'application/json')
        .expect(function (res) {
          if (res.text !== 'GET to /test') {
            throw new Error('wrong text');
          }
        })
        .end(done);
    //expect(404) will check the
  })

  describe('GET /add', function(){
    describe('/2/3', function() {
      it('/2/3 returns the sum of 5', function(done) {
        SuperTest(app)
            .get('/add/2/3')
            .expect('5')
            .end(done);
        });

        it('/7/10 returns the sum of 17', function(done) {
          SuperTest(app)
              .get('/add/7/10')
              .expect('17')
              .end(done);
        });
    })
  })
});