'use strict';

angular.module('dian')

  .config(function($routeProvider) {
    var viewsPath= 'app/queue/views/';
    $routeProvider
      .when('/queue', {
        templateUrl: viewsPath + 'queue.html',
        controller: 'QueueCtrl'
      })
      .when('/queue/detail/:id', {
        templateUrl: viewsPath + 'queue_detail.html',
        controller: 'QueueDetailCtrl'
      })
      .when('/queue/history/', {
        templateUrl: viewsPath + 'queue_history.html',
        controller: 'QueueHistoryCtrl'
      })
      .when('/queue/history/detail/:id', {
        templateUrl: viewsPath + 'queue_history_detail.html',
        controller: 'QueueHistoryDetailCtrl'
      })
      .when('/queue/join/', {
        templateUrl: viewsPath + 'queue_join.html',
        controller: 'QueueJoinCtrl'
      })
      .when('/queue/join/do', {
        templateUrl: viewsPath + 'queue_join_do.html'
      })
    ;
  })

;
