'use strict';

angular.module('dian')
  .config(function($routeProvider) {
    $routeProvider
      .when('/menu/orders/:id', {
        templateUrl: 'app/menu/menu.orders.html',
        controller: 'MenuOrdersCtrl'
      })
      .when('/restaurant/catogaries', {
        templateUrl: 'app/menu/restaurant.catogaries.html',
        controller: 'RestaurantCatogariesCtrl'
      })
      .when('/orders/history', {
        templateUrl: 'app/menu/menu.orders.history.html',
        controller: 'MenuOrdersHistoryCtrl'
      })
      .when('/carts', {
        templateUrl: 'app/menu/carts.html',
        controller: 'CartsCtrl'
      })
  })

.controller('MenuCtrl', ['config', '$scope', '$http',
  function(config, $scope, $http) {
    $http.get(config.api_url + '/wp/trade/list-order-now/', {
      params: {
        wp_openid: 123
      }
    }).then(function(res) {
      console.log("fetch a user's orders");
      console.log(res.data);
      $scope.orders = res.data;
    });
  }
])

.controller('MenuOrdersCtrl', ['$scope', '$routeParams', 'fetch',
  function($scope, $routeParams, fetch) {
    var order_id = $routeParams.id;
    console.log('order');
    fetch('detail-order')({
      id: order_id
    }).then(function(res) {
      $scope.order = res.data;
      console.log(res.data);
    });
  }
])

.controller('RestaurantCatogariesCtrl', ['fetch', '$scope',
  function(fetch, $scope) {
    $scope.ui = { cur_tab: 0 };//view model of tabs

    $scope.count = function(product, num) {
      product.count && (product.count += num);
    };

    fetch('restaurant-menu')(null, {
      openid: 'can123'
    }).then(function(res) {
      console.log('restaurant menu');
      console.log(res.data[0]);
      $scope.menu = res.data[0];//an array now one restaurant has only one menu
    });
  }
])

.controller('MenuOrdersHistoryCtrl', ['config', '$http', '$scope',
  function(config, $http, $scope) {
    $scope.orders = [{
      "id": 1,
      "restaurant": 1,
      "restaurant_name": "test-restaurant",
      "create_time": "2015-07-01T08:25:41Z",
      "price": "1.000",
      "status": 0,
      "confirm_time": "2015-07-01T16:48:00Z",
      "pay_time": "2015-07-01T16:47:59Z"
    }]
    $http.get(config.api_url + '/wp/trade/list-order/', {
      params: {
        wp_openid: 123
      }
    }).then(function(res) {
      //$scope.orders = res.data;
    });
  }
])

.controller('CartsCtrl', ['$scope', function($scope) {
  $scope.products = [{name: 123}]
}]);

