'use strict';

angular.module('dianApp')
  .directive('qnImage', ['$timeout', 'config', function($timeout, config) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs, ctrl) {
        attrs.$observe('imgKey', function(new_img_key, old_img_key) {
          if (new_img_key !== old_img_key) {
            $timeout(function() {
              element.attr('src', config.cdnFileUrl + new_img_key);
            }, 1000);
          }
        });
      }
    };
  }]);
