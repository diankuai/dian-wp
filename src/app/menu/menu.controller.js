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

  .controller('MenuCtrl', ['$scope', function ($scope, $routeParams) {
  }])

  .controller('MenuOrdersCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
    console.log('orders route params');
    console.log($routeParams);
  }])

  .controller('MenuOrdersHistoryCtrl', [function() {

  }]);
