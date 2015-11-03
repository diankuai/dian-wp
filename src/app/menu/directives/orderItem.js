'use strict';

angular.module('dian')
  .directive('orderItem', function() {
    return {
      scope: {
        item: '=',
        hideCount: '='
      },
      templateUrl: 'app/menu/directives/orderItem.html'
    };
  })
  ;
