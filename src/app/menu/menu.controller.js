'use strict';

angular.module('dian')

  .controller('MenuCtrl', ['utils', 'weixin', 'config', '$scope', '$http', '$location',
    function(utils, weixin, config, $scope, $http, $location) {
      utils.setTitle('点菜');
      $http.get(config.apiUrl + '/wp/trade/list-current-order/')
      .then(function(res) {
        $scope.orders = res.data || [];
      });

      $scope.scan = function () {
        weixin.safeExec('scanQRCode', {
          needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode","barCode"] // 可以指定扫二维码还是一维码，默认二者都有
        }).then(function(res) {
          //alert(res.resultStr);
        });
      };
    }
  ])

  .controller('MenuOrderDetailCtrl', ['config', '$scope', '$routeParams', '$http', 'utils',
    function(config, $scope, $routeParams, $http, utils) {
      var order_id = $routeParams.id;
      $http.get(config.apiUrl + '/wp/trade/get-detail-order/', {
        params: {
          order_id: order_id
        }
      }).then(function(res) {
        $scope.order = res.data;
        utils.setTitle($scope.order.restaurant_name);

        $scope.total_price = utils.listItemSum($scope.order.order_items, 'price', 'count');
        $scope.total_count = utils.listItemSum($scope.order.order_items, 'count');
      });
    }
  ])

  .controller('MenuOrderHistoryCtrl', ['config', '$http', '$scope', 'utils',
    function(config, $http, $scope, utils) {
      utils.setTitle('订单历史');
      $http.get(config.apiUrl + '/wp/trade/list-history-order/').then(function(res) {
        $scope.orders = res.data || [];
      });
    }
  ])

  .controller('MenuOrderHistoryDetailCtrl', ['config', '$scope', '$routeParams', '$http', 'utils',
    function(config, $scope, $routeParams, $http, utils) {
      var order_id = $routeParams.id;
      $http.get(config.apiUrl + '/wp/trade/get-detail-order/', {
        params: {
          order_id: order_id
        }
      }).then(function(res) {
        $scope.order = res.data;
        utils.setTitle($scope.order.restaurant_name);

        $scope.total_price = utils.listItemSum($scope.order.order_items, 'price', 'count');
        $scope.total_count = utils.listItemSum($scope.order.order_items, 'count');
      });
    }
  ])

  // http://127.0.0.1:3000/#/menu/buy/?state=6642de481433dde8d6e52dd5045ce976
  .controller('MenuBuyCtrl', ['config', 'utils', '$scope', '$http', '$location',
    function(config, utils, $scope, $http, $location) {

      //table's openid
      var openid = $location.search().state || '';
      $scope.table_openid = openid;

      $http.get(config.apiUrl + '/wp/trade/get-cart-by-table/', {
        params: {
          openid: openid 
        }
      }).then(function(res) {
        console.log(res.data);
        $scope.cart = res.data;
        utils.setTitle(res.data.restaurant_name);
      });

      $http.get(config.apiUrl + '/wp/menu/list-menu-by-table/', {
        params: {
          openid: openid 
        }
      }).then(function(res) {
        console.log(res.data[0]);
        $scope.menu = res.data[0];//an array now one restaurant has only one menu
        // $scope.menu.restaurant_name = 123;//for debug
      });

      // 根据餐桌openid获取在当前餐厅的订单
      $http.get(config.apiUrl + '/wp/trade/list-current-order-by-table/', {
        params: {
          openid: openid 
        }
      }).then(function(res) {
        $scope.current_orders = res.data || [];
      });

      $scope.ui = {
        cur_tab: 0
      };//view model of tabs and cur category

      $scope.products_collection = [];

      $scope.change = function(product, num) {
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
          i = utils.find($scope.products_collection, 'id', product.id);
          $scope.products_collection = c.slice(0, i).concat(c.slice(i + 1));
        }
      };

      $scope.submit = function() {
        var products_collection = angular.extend($scope.products_collection);
        if (products_collection.length < 1) {
          return;
        };
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
        $http.post(config.apiUrl + '/wp/trade/update-cart/' + $scope.cart.id + '/',
          products_collection
        ).then(function(res) {
          if (res.data.id) {
            $location.path('/menu/buy/confirm/' + res.data.id);
          } else {
            console.log(res);
          };
        });
      };

      //oops, $watchCollection not udpate item, only create remove move
      //so use watch
      $scope.$watch('products_collection', function(newpc) {
        $scope.total_price = utils.listItemSum(newpc, 'price', 'count');
        $scope.total_count = utils.listItemSum(newpc, 'count');
      }, true);

    }
  ])

  .controller('MenuBuyCurrentCtrl', ['utils', 'weixin', 'config', '$scope', '$http', '$location', '$routeParams',
    function(utils, weixin, config, $scope, $http, $location, $routeParams) {
      var openid = $routeParams.table_openid;

      $http.get(config.apiUrl + '/wp/trade/list-current-order-by-table/', {
        params: {
          openid: openid
        }
      }).then(function(res) {
        if (res.data.length > 0) {
          utils.setTitle(res.data[0].restaurant_name);
        }
        $scope.current_orders = res.data || [];
      });

    }
  ])

  .controller('MenuBuyConfirmCtrl', ['config', 'utils', '$scope', '$http', '$location', '$routeParams',
    function(config, utils, $scope, $http, $location, $routeParams) {

      var cart_id = $routeParams.id;

      $http.get(config.apiUrl + '/wp/trade/get-cart/', {
        params: {
          cart_id: cart_id
        }
      }).then(function(res) {
        utils.setTitle(res.data.restaurant_name);

        $scope.cart = res.data;
        cart_id = $scope.cart.id;
        $scope.products = utils.map($scope.cart.cart_items || [], function(v) {
          //extend product into cart_item for ng-repeat
          delete v.product.id;
          return angular.extend(v, v.product);
        });
        $scope.total_price = utils.listItemSum($scope.products, 'price', 'count');
        $scope.total_count = utils.listItemSum($scope.cart.cart_items, 'count');
      });

      $scope.confirmSubmit = function(order) {
        var restaurant_openid, member_openid;
        $http.get(config.apiUrl + '/wp/trade/create-order-from-cart/', {
          params: {
            cart_id: cart_id 
          }
        }).then(function(res) {
          console.log(res);
          $location.path('/menu/order/detail/' + res.data.id);
        });
      };
    }
  ])
  ;

