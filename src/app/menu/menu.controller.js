'use strict';

angular.module('dian')
  .config(function($routeProvider) {
    $routeProvider
      .when('/menu/orders/:id', {
        templateUrl: 'app/menu/menu.orders.html',
        controller: 'MenuOrdersCtrl'
      })
      .when('/restaurant/catogaries', {
        templateUrl: 'app/menu/restaurant.categories.html',
        controller: 'RestaurantCatogariesCtrl'
      })
      .when('/orders/history', {
        templateUrl: 'app/menu/menu.orders.history.html',
        controller: 'MenuOrdersHistoryCtrl'
      })
      .when('/carts', {
        templateUrl: 'app/menu/carts.html',
        controller: 'CartsCtrl'
      });
  })

.controller('MenuCtrl', ['weixin', 'config', '$scope', '$http',
  function(weixin, config, $scope, $http) {
    $http.get(config.api_url + '/wp/trade/list-order-now/', {
      params: {
        wp_openid: 123
      }
    }).then(function(res) {
      console.log('fetch a user orders');
      console.log(res.data);
      $scope.orders = res.data;
    });

    $scope.scan = function() {
      weixin.safeExec('scanQRCode').then(function(res) {
        console.log('scanQRCode');
        console.log(res);
      });
    };

  }
])

.controller('MenuOrdersCtrl', ['$scope', '$routeParams', 'fetch', 'utils',
  function($scope, $routeParams, fetch, utils) {
    var order_id = $routeParams.id, member_openid, restaurant_openid;
    console.log('order');
    fetch('detail-order')({
      id: order_id
    }).then(function(res) {
      $scope.order = res.data;
      $scope.total_price = utils.listItemSum($scope.order.order_items, 'price');
      $scope.total_count = utils.listItemSum($scope.order.order_items, 'count');
      console.log(res.data);
    });
  }
])

.controller('MenuOrdersHistoryCtrl', ['config', '$http', '$scope',
  function(config, $http, $scope) {
    $http.get(config.api_url + '/wp/trade/list-order/', {
      params: {
        wp_openid: 123
      }
    }).then(function() {
    }).then(function(res) {
      $scope.orders = res.data;
    });
  }
]);


