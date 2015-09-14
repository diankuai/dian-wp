'use strict';

angular.module('dian')
.directive('product', function() {
  return {
    scope: {
      item: '=',
      unit: '='
    },
    templateUrl: 'app/directives/product.html'
  };
});
