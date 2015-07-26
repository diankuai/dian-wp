angular.module('dian')

.directive('photo', function() {
  'use strict';
  return {
    scope: {
      photo: '='
    },
    templateUrl: 'app/directives/photo.html'
  };

});

