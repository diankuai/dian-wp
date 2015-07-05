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

.controller('RestaurantCatogariesCtrl', ['config', 'utils', 'fetch', '$scope', '$http',
  function(config, utils, fetch, $scope, $http) {
    var restaurant_openid, member_openid, cart_id;
    $scope.ui = { cur_tab: 0 };//view model of tabs and cur category

    $scope.products_collection = [];

    $scope.add = function(product, num) {
      !product.count && (product.count = 0);
      if (num < 0 && product.count + num <= 0) {
        product.count = 0;
        rmFromCart(product);
      } else {
        if (product.count >= 0) {
          product.count += num;
          if (cartConain(product)) {
            updateCartProduct(product);
          } else {
            addToCart(product);
          }
        }
      }
      console.log($scope.products_collection);
      function updateCartProduct(product) {
        var i;
        i = utils.find($scope.products_collection, 'id', product.id);
        $scope.products_collection[i] && ($scope.products_collection[i] = product);
      }

      function cartConain(product) {
        return utils.find($scope.products_collection, 'id', product.id) !== -1;
      }

      function addToCart(product) {
        $scope.products_collection.push(product);
      }

      function rmFromCart(product) {
        var i, c;
        c = $scope.products_collection;
        if (!cartConain(product)) {
          return;
        }
        i  = utils.find($scope.products_collection, 'id', product.id);
        $scope.products_collection = c.slice(0, i).concat(c.slice(i + 1));
      }
    };


    $scope.selectOk = function() {
      var products_collection = angular.extend($scope.products_collection);
      angular.forEach(products_collection, function(v) {
        angular.forEach(v, function(value, key, obj) {
          if (!obj.productid) {
            obj.productid = obj.id;
          }
          if (key === 'productid' || key === 'count') {
            return;
          }
          delete obj[key];
        });
      });
      $http.post(
        config.api_url + '/wp/trade/update-cart/' + cart_id + '/',
        products_collection
      )
      .then(function(res) {
        console.log('post cart');
        console.log(res);
      });
    };

    //oops, $watchCollection not udpate item, only create remove move
    //so use watch
    $scope.$watch('products_collection', function(newpc) {
      $scope.total_price = utils.listItemSum(newpc, 'price', 'count');
      $scope.total_count = utils.listItemSum(newpc, 'count');
    }, true);

    fetch('restaurant-menu')(null, {
      openid: restaurant_openid = 'can123'
    }).then(function(res) {
      console.log('restaurant menu');
      console.log(res.data[0]);
      $scope.menu = res.data[0];//an array now one restaurant has only one menu
      $scope.menu.restaurant_name = 123;//for debug
    });

    fetch('restaurant-cart')({table_id: 1}, {
      openid: restaurant_openid = 'can123',
      wp_openid: member_openid = 123
    }).then(function(res) {
      console.log('restaurant cart');
      console.log(res.data);
      $scope.cart = res.data;
      cart_id = $scope.cart.id;
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
    }).then(function() {
    //}).then(function(res) {
      //$scope.orders = res.data;
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
      console.log('place order');
      console.log(order);
      console.log('response');
      console.log(res);
    });
  };

  fetch('restaurant-cart')({table_id: 1}, {
      openid: restaurant_openid = 'can123',
      wp_openid: member_openid = 123
    }).then(function(res) {
      console.log('cart');
      console.log(res.data);
      $scope.cart = res.data;
      cart_id = $scope.cart.id;
      $scope.products = $scope.cart.cart_items || [];
      //$scope.products = utils.pluck($scope.cart.cart_items, 'product');
      $scope.total_price = utils.listItemSum($scope.products, 'price');
      $scope.total_count = utils.listItemSum($scope.cart.cart_items, 'count');
    });
}]);

