'use strict';

angular.module('dian', ['ngCookies', 'ngTouch', 'ngRoute'])
  .constant('config', {
    api_url: 'http://dev.dk26.com:8080'
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/photo', {
        templateUrl: 'app/photo/photo.html',
        controller: 'PhotoCtrl'
      })
      .when('/menu', {
        templateUrl: 'app/menu/menu.html',
        controller: 'MenuCtrl'
      })
      .when('/queue', {
        templateUrl: 'app/queue/queue.html',
        controller: 'QueueCtrl'
      })
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
;
