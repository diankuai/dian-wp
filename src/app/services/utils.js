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
    },
    find: function(collection, key, value) {
      var index = -1;
      angular.forEach(collection, function(obj, i) {
        //here angular foreach not support break
        if (obj[key] === value) {
          index = i;
        }
      });
      return index;
    },
    contains: function(collection, key, value) {
      return this.find(collection, key, value) === -1;
    }
  };
});

