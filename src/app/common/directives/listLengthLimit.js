'use strict';

angular.module('dian')
  .directive('listLengthLimit', ['config', function(config) {
    return {
      scope: {
        list: '='
      },
      link: function (scope) {
        scope.limit = config.listLength;
      },
      templateUrl: 'app/common/directives/listLengthLimit.html'
    };
  }])
  ;
