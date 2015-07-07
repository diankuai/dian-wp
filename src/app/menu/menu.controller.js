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

.controller('MenuCtrl', ['config', '$scope', '$http',
  function(config, $scope, $http) {
    $http.get(config.api_url + '/wp/trade/list-order-now/', {
      params: {
        wp_openid: 123
      }
    }).then(function(res) {
      console.log('fetch a user orders');
      console.log(res.data);
      $scope.orders = res.data;
    });
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
])

.controller('CartsCtrl', ['config', 'utils', 'fetch', '$scope', '$http', function(config, utils, fetch, $scope, $http) {
  var restaurant_openid, member_openid, cart_id;
  //$scope.products = [{name: 123}];
  $scope.placeOrder = function(order) {
    $http.post(config.api_url + '/wp/trade/create-order-from-cart/' + cart_id + '/', {}, {
      params: {
        openid: restaurant_openid,
        wp_openid: member_openid
      }
    }).then(function(res) {
      $scope.order_create_ok = true;
      console.log('place order');
      console.log(order);
      console.log('response');
      console.log(res);
    });
  };

  fetch('restaurant-cart')({table_id: 2}, {
      openid: restaurant_openid = 'can123',
      wp_openid: member_openid = 123
    }).then(function(res) {
      console.log('cart');
      console.log(res.data);
      $scope.cart = res.data;
      cart_id = $scope.cart.id;
      $scope.products = utils.map($scope.cart.cart_items || [], function(v) {
        //extend product into cart_item for ng-repeat
        delete v.product.id;
        return angular.extend(v, v.product);
      });
      $scope.total_price = utils.listItemSum($scope.products, 'price');
      $scope.total_count = utils.listItemSum($scope.cart.cart_items, 'count');
    });
}]);

