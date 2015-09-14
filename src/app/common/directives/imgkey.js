'use strict';

/* global config */

/**
 * @ngdoc directive
 * @name dianApp.directive:imgKey
 * @description
 * # fetch img by img-key than put to child div
 * @example:
 */

angular.module('dianApp')
    .directive('imgKey', ['$timeout', 'config', function($timeout, config) {
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
