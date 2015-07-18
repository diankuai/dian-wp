'use strict';

angular.module('dian')
  .config(function($routeProvider) {
    $routeProvider
      .when('/queue_history/', {
        templateUrl: 'app/queue/queue_history.html',
        controller: 'QueueHitstoryCtrl'
      })
      .when('/queue/join/', {
        templateUrl: 'app/queue/queue_join.html',
        controller: 'QueueJoinCtrl'
      })
      .when('/queue/join/do', {
        templateUrl: 'app/queue/queue_join_do.html'
      })
      .when('/queue_items/:id', {
        templateUrl: 'app/queue/queue_items.html',
        controller: 'QueueItemsCtrl'
      });
  })
  .controller('QueueHitstoryCtrl', function(config, $scope, $http) {
    $http.get(config.api_url + '/wp/registration/list-history-registration/')
    .then(function(res) {
      console.log('queue history');
      console.log(res.data);
      $scope.queue = res.data;

      //for debug
      $scope.queue = [{
        restaurant: {
          name: 'this is restaurant'
        },
        id: 1
      }];
    });
  })

  .controller('QueueJoinCtrl', function(config, $scope, $http, $location) {
    var restaurant_openid;

    restaurant_openid = $location.search('restaurant_openid') || '';
    restaurant_openid = 'can123';//for debug
    $http.get(config.api_url + '/wp/restaurant/get-restaurant/', {
      params: {
        openid: restaurant_openid
      }
    })
    .then(function(res) { 
      console.log('restaurant');
      console.log(res.data);
      $scope.restaurant = res.data;
    });

    $http.get(config.api_url + '/wp/table/list-table-type-by-restaurant/', {
      params: {
        openid: restaurant_openid
      }
    }).then(function(res) {
      console.log('table types');
      console.log(res.data);
      $scope.table_types = res.data;
    });

    $scope.join = function () {
      $http.post(config.api_url + '/wp/registration/confirm-table-type/', {
        restaurant_openid: restaurant_openid,
        phone: '123',
        wp_openid: 123//for debug
      }).then(function(res) {
        console.log('join to queue ok');
        console.log(res.data);
        $location.path('#/queue/join/do');
      });
    };
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
    $http.get(config.api_url + '/wp/registration/list-current-registration/')
    .then(function(res) {
      console.log('queue list');
      console.log(res.data);
      $scope.queue = res.data || [];
      
    });
    /* for debug
    $scope.queue = [{
      restaurant: {
        name: 'this is restaurant'
      },
      id: 1
    }];
    */
  });
