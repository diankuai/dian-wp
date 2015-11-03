'use strict';

angular.module('dian')
  .directive('productItem', ['config', function(config) {
    return {
      scope: {
        item: '='
      },
      templateUrl: 'app/menu/directives/productItem.html',
      link: function(scope, element, attrs, ctrl) {
        scope.cdnFileUrl = config.cdnFileUrl;
        scope.productIconFormat = config.productIconFormat;
      }
    };
  }])
  ;
