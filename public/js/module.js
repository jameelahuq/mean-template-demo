'use strict';

var app = angular.module('APP_NAME', ['ui.router', 'ui.bootstrap']);

app.constant('tokenStorageKey', 'my-token');

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
      .state('home', { url: '/', templateUrl: '/html/general/home.html', controller: 'homeCtrl' })

      .state('users', { abstract: true, templateUrl: '/html/users/users.html'})
      .state('users.login', { url: '/login', templateUrl: '/html/users/form.html', controller: 'usersCtrl'})
      .state('users.register', { url: '/register', templateUrl: '/html/users/form.html', controller: 'usersCtrl'})

      .state('upload', { url: '/upload', templateUrl: '/html/files/upload.html', controller: 'filesCtrl'})

  $urlRouterProvider.otherwise('/');
});
