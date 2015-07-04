'use strict';

angular.module('dian')
.directive('product', function() {
  return {
    scope: {
      item: '='
    },
    templateUrl: 'app/directives/product.html'
  };
});
