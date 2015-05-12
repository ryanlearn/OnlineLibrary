var app = angular.module('bake', [ 'ngResource']);
//This configures the routes and associates each route with a template
app.config(function ($routeProvider) {
  $routeProvider
  .when('/',
    {
      templateUrl: '/app/templates/index.html'
    })
    .when('/home',
    {
      templateUrl: '/app/templates/home.html'
    })
  .otherwise(
    {
      redirectTo: '/'
    });
});