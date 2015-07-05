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

.controller('MenuOrdersCtrl', ['$scope', '$routeParams', 'fetch', 'utils',
  function($scope, $routeParams, fetch, utils) {
    var order_id = $routeParams.id;
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

.controller('RestaurantCatogariesCtrl', ['fetch', '$scope',
  function(fetch, $scope) {
    var restaurant_openid;
    $scope.ui = { cur_tab: 0 };//view model of tabs

    $scope.count = function(product, num) {
      product.count && (product.count += num);
    };

    $scope.selectOk = function() {

    };

    fetch('restaurant-menu')(null, {
      openid: restaurant_openid = 'can123'
    }).then(function(res) {
      console.log('restaurant menu');
      console.log(res.data[0]);
      $scope.menu = res.data[0];//an array now one restaurant has only one menu
      $scope.menu.restaurant_name = 123;//for debug
    });


  }
])

.controller('MenuOrdersHistoryCtrl', ['config', '$http', '$scope',
  function(config, $http, $scope) {
    $scope.orders = [{
      "id": 3,
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

.controller('CartsCtrl', ['fetch', '$scope', function(fetch, $scope) {
  var restaurant_openid, memeber_openid;
  //$scope.products = [{name: 123}];
  fetch('restaurant-cart')(null, {
      openid: restaurant_openid = 'can123',
      wp_openid: memeber_openid = 123
    }).then(function(res) {
      console.log('cart');
      console.log(res.data);
      $scope.cart = res.data;
      $scope.products = $scope.cart.cart_items || [];
    });
}]);

