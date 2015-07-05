'use strict';

angular.module('dian')
.directive('header', function() {
  return {
    scope: {
      title: '@'
    },
    templateUrl: 'app/directives/header.html'
  };
});
