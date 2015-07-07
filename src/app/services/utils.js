'use strict';

angular.module('dian')
.factory('utils', function() {
  return {
    listItemSum: function(list, key, other) {
      var sum = 0, factor;
      angular.forEach(list, function(v) {
        if (!angular.isUndefined(v[key])) {
          sum += (v[key] * (factor = (angular.isNumber(v[other] * 1) && v[other]) || 1) * 1.0);
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
    map: function(collection, iter, thisArg) {
      var ret = [];
      angular.forEach(collection, function(v) {
        ret.push(angular.isFunction(iter) ? iter.call(thisArg, v) : v);
      });
      return ret;
    },
    contains: function(collection, key, value) {
      return this.find(collection, key, value) === -1;
    },
    pluck: function(collection, key) {
      var ret = [];
      angular.forEach(collection, function(v) {
        ret.push(v[key]);
      });
      return ret;
    }

  };
});

