angular.module('dian')
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

    fetch('restaurant-cart')({table_id: 2}, {
      openid: restaurant_openid = 'can123',
      wp_openid: member_openid = 123
    }).then(function(res) {
      console.log('restaurant cart');
      console.log(res.data);
      $scope.cart = res.data;
      cart_id = $scope.cart.id;
    });


  }
]);
