/**
 * Created by HUQ on 10/14/15.
 */
'use strict';

//chai testing protocol
var expect = require('chai').expect;
var should = require('chai').should();

//app requirements
var mongoose = require('mongoose').connect('mongodb://localhost/mean-template/testing');
require('dotenv').load();

//variable requirements
var User = require('../../models/user');

describe('User', function() {

  var user;
  beforeEach(function() {
    user = new User({username: 'test'});
  });

  describe('saving', function() {
    beforeEach(function(done) {
      User.remove({}, function(err) {
        var user = new User({username: 'mrtest'});
        console.log(user);
        user.save(function(err, savedUser) {
          done();
        })
      })
    });

    after(function(done) {
      User.remove({}, done);
    });


    it ('properly saves a new user', function(done) {
      var user = new User({username: 'mrstest'});
      user.save(function( err, savedUser) {
        expect(err).to.not.be.ok;
        expect(savedUser.username).to.equal(user.username);
        done();
      })
    })

    it ('does not save a duplicate username', function(done) {
      var user = new User({username: 'mrtest'});
      user.save(function( err, savedUser) {
        expect(err).to.be.ok;
        expect(savedUser).to.not.be.ok;
        done();
      })
    })
  });



  describe('setPassword', function() {

    //before(function() {
    //  console.log("will display first");
    //});


    it('should set the password', function(done) {
      user.setPassword('test');
      expect(user.username).to.equal('test');
      expect(user.salt).to.be.ok;
      expect(user.hash).to.have.length(128);
      done();
    });



    //var badUser = new User({username: 'badTest'});
    it('should set NOT set the password', function(done) {
      expect(user.username).to.equal('test');
      expect(user.salt).to.not.be.ok;
      expect(user.hash).to.not.be.ok;
      done();
    });
  });

  describe('validPassword', function() {
    beforeEach(function() {
      user.setPassword('test');
    });

    it('should return true if passwords match', function(done) {
      expect(user.validPassword('test')).to.be.true;
      done();
    });

    it('should return false if passwords do not match', function(done) {
      expect(user.validPassword('badtest')).to.be.false;
      done();
    })
  });

  describe('generateJWT', function() {
    it('should create a jtw token', function(done) {
      var token = user.generateJWT();
      var tokenParts = token.split('.');

      var payloadBuffer = new Buffer(tokenParts[1], 'base64');
      var payloadString = payloadBuffer.toString('ascii');
      var payload = JSON.parse(payloadString);

      expect(payload.username).to.equal(user.username);
      expect(tokenParts).to.have.length(3);
      expect(payload._id).to.equal(user._id.toString());
      done();
    })
  });

  //UserSchema.methods.generateJWT = function() {
  //  // set expiration to 60 days
  //  var today = new Date();
  //  var exp = new Date(today);
  //
  //  exp.setDate(today.getDate() + 60);
  //
  //  return jwt.sign({
  //    _id: this._id,
  //    username: this.username,
  //    exp: parseInt(exp.getTime() / 1000)
  //  }, process.env.JWT_SECRET);
  //};



});





describe('This Test File', function () {
  it('executes', function(done) {
    expect(1).to.equal(1);
    done();
  });
});