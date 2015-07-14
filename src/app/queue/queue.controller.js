'use strict';

angular.module('dian')
  .config(function($routeProvider) {
    $routeProvider
      .when('/queue_items/:id', {
        templateUrl: 'app/queue/queue_items.html',
        controller: 'QueueItemsCtrl'
      });
  })
  .controller('QueueItemsCtrl', function() {

  })
  .controller('QueueCtrl', function (config, $scope, $http) {
    $http.get(config.api_url + '/wp/registration/list-current-registration/').then(function(res) {
      console.log('queue list');
      console.log(res.data);
      $scope.queue = res.data;
    });
  });
