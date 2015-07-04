'use strict';

angular.module('dian')
  .directive('goback', ['$window', function($window) {
    return function(scope, element, attrsctrl) {
      element.on('click', function() {
        $window.history.back();
        //scope.apply();
      });
    };
  }]);
