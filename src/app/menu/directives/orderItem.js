'use strict';

angular.module('dian')
  .directive('productItem', function() {
    return {
      scope: {
        item: '=',
        hideCount: '='
      },
      templateUrl: 'app/menu/directives/orderItem.html'
    };
  })
  ;
