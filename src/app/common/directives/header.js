'use strict';

angular.module('dian')
.directive('header', function() {
  return {
    priority: 100,
    scope: {
      title: '@',
      goback: '@'
    },
    templateUrl: 'app/directives/header.html'
  };
});
