'use strict';

angular.module('dian')
  .config(function($routeProvider) {
    $routeProvider
      .when('/menu/orders/:id', {
        template: '<div>123</div>'
      })
  })
  .controller('MenuCtrl', function ($scope) {

  });
