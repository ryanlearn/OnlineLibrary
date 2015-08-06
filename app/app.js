var app = angular.module('lib', ['ngResource', 'ngRoute', 'ui.bootstrap']);
//This configures the routes and associates each route with a template
app.config(function ($routeProvider) {
  $routeProvider
  .when('/',
    {
      templateUrl: '/app/templates/home.html'
    })
    .when('/home',
    {
      templateUrl: '/app/templates/home.html'
    })
  .otherwise(
    {
      redirectTo: '/app/templates/home.html'
    });
});