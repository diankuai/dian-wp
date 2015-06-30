'use strict';

angular.module('dian')
  .config(function($routeProvider) {
    $routeProvider
      .when('/menu/orders/:id', {
        templateUrl: 'app/menu/menu.orders.html',
        controller: 'MenuOrdersCtrl'
      });
  })

  .controller('MenuCtrl', ['$scope', function ($scope, $routeParams) {
  }])

  .controller('MenuOrdersCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
    console.log('orders route params');
    console.log($routeParams);
  }])
