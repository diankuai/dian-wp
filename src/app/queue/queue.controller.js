'use strict';

angular.module('dian')

  .controller('QueueCtrl', function (config, $scope, $http, utils, weixin) {
    utils.setTitle('排队');
    $http.get(config.apiUrl + '/wp/registration/list-current-registration/')
    .then(function(res) {
      $scope.queue = res.data || [];
    });

    $scope.scan = function () {
      weixin.safeExec('scanQRCode', {
        needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode","barCode"] // 可以指定扫二维码还是一维码，默认二者都有
      }).then(function(res) {
        //alert(res.resultStr);
      });
    };

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

  .controller('QueueJoinCtrl', function(config, $scope, $http, $location, utils) {
    var restaurant_openid;

    restaurant_openid = $location.search().state || '';
    $http.get(config.apiUrl + '/wp/restaurant/get-restaurant/', {
      params: {
        openid: restaurant_openid
      }
    }).then(function(res) {
      $scope.restaurant = res.data;
      utils.setTitle($scope.restaurant.name);
    });

    $http.get(config.apiUrl + '/wp/table/list-table-type-by-restaurant/', {
      params: {
        openid: restaurant_openid
      }
    }).then(function(res) {
      $scope.table_types = res.data || [];
    });

    $http.get(config.apiUrl + '/wp/registration/list-current-registration-by-restaurant/', {
      params: {
        restaurant_openid: restaurant_openid
      }
    }).then(function(res) {
      $scope.current_queue = res.data || [];
    });

    $scope.target = {}; //for table_type_selected
    $scope.join = function () {
      if (!$scope.target.table_type_selected) {
        return;
      }
      $http.post(config.apiUrl + '/wp/registration/confirm-table-type/', {
        restaurant_openid: restaurant_openid,
        table_type_id: $scope.target.table_type_selected.id
      }).then(function(res) {
        console.log(res);
        if (res.data.id) {
          $location.path('/queue/join/detail/' + res.data.id);
        } else {
          console.log(res.data);
        };
      });
    };
  })

  .controller('QueueJoinDetailCtrl',
      function(config, $scope, $http, $routeParams, utils, memberInfo) {
    memberInfo.then(function (res) {
      $scope.member = res.data;
      console.log($scope.member);
    });
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

  .controller('QueueJoinCurrentCtrl', function (config, $scope, $http, $routeParams, utils) {
    var restaurant_openid = $routeParams.restaurant_openid;

    $http.get(config.apiUrl + '/wp/restaurant/get-restaurant/', {
      params: {
        openid: restaurant_openid
      }
    }).then(function(res) {
      $scope.restaurant = res.data;
      utils.setTitle($scope.restaurant.name);
    });

    $http.get(config.apiUrl + '/wp/registration/list-current-registration-by-restaurant/', {
      params: {
        restaurant_openid: restaurant_openid
      }
    }).then(function(res) {
      $scope.queue = res.data || [];
    });

  })

;

