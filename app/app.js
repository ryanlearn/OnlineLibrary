var app = angular.module('lib', ['ngResource', 'ngRoute', 'ui.bootstrap']);
//This configures the routes and associates each route with a template
app.config(function ($routeProvider) {
  $routeProvider
  .when('/',
    {
      templateUrl: '/app/templates/login.html'
    })
    .when('/home',
    {
      templateUrl: '/app/templates/home.html'
    })
    .when('/popular',
    {
      templateUrl: '/app/templates/popular.html'
    })
    .when('/friends',
    {
      templateUrl: '/app/templates/findFriends.html'
    })
    .when('/u/:UserID',
    {
      templateUrl: '/app/templates/home.html'
    })    
  .otherwise(
    {
      redirectTo: '/app/templates/login.html'
    });
});