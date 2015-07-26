angular.module('dian')

.directive('photo', function() {
  'use strict';
  return {
    scope: {
      photo: '='
    },
    transclude: true,
    templateUrl: 'app/directives/photo.html'
  };

});

