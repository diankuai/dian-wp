'use strict';

angular.module('dian')
  .directive('itemList', function() {
    return {
      scope: {
        items: '='
      },
      templateUrl: 'app/menu/directives/itemList.html'
    };
  })
  ;
