'use strict';

angular.module('dian')

.controller('CartsCtrl', ['config', 'utils', 'fetch', '$scope', '$http', function(config, utils, fetch, $scope, $http) {
  var restaurant_openid, member_openid, cart_id;
  //$scope.products = [{name: 123}];
  $scope.placeOrder = function(order) {
    $http.post(config.apiUrl + '/wp/trade/create-order-from-cart/' + cart_id + '/', {}, {
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

  fetch('restaurant')(null, {
    openid: restaurant_openid
  }).then(function(res) {
    console.log('restaurant');
    console.log(res.data);
    $scope.restaurant = res.data;
    /*
    $scope.restaurant = angular.extend($scope.restaurant, {
      wifi_name: 123,
      wifi_password: 213,
      wp_qrcode_file_key: 123123123
    });
    */
  });
}]);


