'use strict';

angular.module('dian')

  .controller('QueueCtrl', function (config, $scope, $http, utils) {
    utils.setTitle('排队');
    $http.get(config.apiUrl + '/wp/registration/list-current-registration/')
    .then(function(res) {
      $scope.queue = res.data || [];
    });
  })

  .controller('QueueDetailCtrl', function(config, $scope, $http, $routeParams, utils) {
    var itemId;
    itemId = $routeParams.id;
    $http.get(config.apiUrl + '/wp/registration/get-detail-registration/', {
      params: {
        id: itemId
      }
    }).then(function(res) {
      $scope.item = res.data;
      utils.setTitle($scope.item.restaurant.name);
    });
  })

  .controller('QueueHistoryCtrl', function(config, $scope, $http, utils) {
    utils.setTitle('排队历史');
    $http.get(config.apiUrl + '/wp/registration/list-history-registration/')
    .then(function(res) {
      $scope.queue = res.data;
    });
  })

  .controller('QueueHistoryDetailCtrl', function(config, $scope, $http, $routeParams, utils) {
    var itemId;
    itemId = $routeParams.id;
    $http.get(config.apiUrl + '/wp/registration/get-detail-registration/', {
      params: {
        id: itemId
      }
    }).then(function(res) {
      $scope.item = res.data;
      utils.setTitle($scope.item.restaurant.name);
    });
  })

  .controller('QueueJoinCtrl', function(config, $scope, $http, $location) {
    var restaurant_openid;

    restaurant_openid = $location.search('restaurant_openid') || '';
    restaurant_openid = 'can123';//for debug
    $http.get(config.apiUrl + '/wp/restaurant/get-restaurant/', {
      params: {
        openid: restaurant_openid
      }
    }).then(function(res) {
      console.log('restaurant');
      console.log(res.data);
      $scope.restaurant = res.data;
    });

    $http.get(config.apiUrl + '/wp/table/list-table-type-by-restaurant/', {
      params: {
        openid: restaurant_openid
      }
    }).then(function(res) {
      console.log('table types');
      console.log(res.data);
      $scope.table_types = res.data;
    });
    $scope.models = {};//for table_type_selected

    $scope.join = function () {
      if (!$scope.models.table_type_selected) {
        return;
      }
      $http.post(config.apiUrl + '/wp/registration/confirm-table-type/', {
        restaurant_openid: restaurant_openid,
        phone: '123',
        wp_openid: '123',//for debug
        table_type: $scope.models.table_type_selected
      }).then(function(res) {
        console.log('join to queue ok');
        console.log(res.data);
        $location.path('#/queue/join/do');
      });
    };
  })

;
