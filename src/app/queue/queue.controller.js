'use strict';

angular.module('dian')
  .config(function($routeProvider) {
    $routeProvider
      .when('/queue_history/', {
        templateUrl: 'app/queue/queue_history.html'
      })
      .when('/queue_items/:id', {
        templateUrl: 'app/queue/queue_items.html',
        controller: 'QueueItemsCtrl'
      });
  })
  .controller('QueueItemsCtrl', function(config, $scope, $http, $routeParams) {
    var queue_item_id;
    console.log('queue item id');
    console.log($routeParams.id);
    queue_item_id = $routeParams.id;
    $http.get(config.api_url + '/wp/registration/get-detail-registration/', {
      params: {
        id: queue_item_id
      }
    }).then(function(res) {
      console.log('queue_item');
      console.log(res.data);
      $scope.queue_item = res.data;
    });
  })
  .controller('QueueCtrl', function (config, $scope, $http) {
    $http.get(config.api_url + '/wp/registration/list-current-registration/').then(function(res) {
      console.log('queue list');
      console.log(res.data);
      $scope.queue = res.data;
    });
  });
