'use strict';

angular.module('dian')
  .config(function($routeProvider) {
    $routeProvider
      .when('/menu/orders/:id', {
        templateUrl: 'app/menu/menu.orders.html',
        controller: 'MenuOrdersCtrl'
      })
      .when('/orders/history', {
        templateUrl: 'app/menu/menu.orders.history.html',
        controller: 'MenuOrdersHistoryCtrl'
      })
  })

  .controller('MenuOrdersCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
    console.log('orders route params');
    console.log($routeParams);
  }])

  .controller('MenuOrdersHistoryCtrl', ['$http', '$scope', function($http, $scope) {
    $http.get('/wp/trade/list-order/').then(function(res) {
      $scope.orders = res.data;
    });
  }]);
