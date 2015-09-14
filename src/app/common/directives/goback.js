'use strict';

angular.module('dian')
  .directive('goback', ['$location', '$window', function($location, $window) {
    return function(scope, element, attrsctrl) {
      element.on('click', function() {
        attrsctrl.goback ?
          $window.location = attrsctrl.goback : //usage: /#/path/to
          $window.history.back();
        //scope.apply();
      });
    };
  }]);
