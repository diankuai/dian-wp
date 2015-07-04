'use strict';

angular.module('dian')
  .factory('fetch', ['config', '$http',
    function(config, $http) {
      return function(resource) {
        return {
          'detail-order': function(route_data) {
            return $http.get(config.api_url + '/wp/trade/get-detail-order/' + route_data.id);
          }
        }[resource];
      };
    }
  ]);

