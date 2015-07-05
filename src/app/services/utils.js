'use strict';

angular.module('dian')
.factory('utils', function() {
  return {
    listItemSum: function(list, key) {
      var sum = 0;
      angular.forEach(list, function(v) {
        if (!angular.isUndefined(v[key])) {
          sum += (v[key] * 1.0);
        }
      });

      return sum;
    }
  };
});

