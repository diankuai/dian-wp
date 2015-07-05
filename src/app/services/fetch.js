'use strict';

angular.module('dian')
  .factory('fetch', ['config', '$http',
    function(config, $http) {
      return function(resource) {
        return {
          'detail-order': function(route_data) {
            return $http.get(config.api_url + '/wp/trade/get-detail-order/' + route_data.id);
          },
          'restaurant-menu': function(route_data, params) {//params is {openid: id}
            return $http.get(config.api_url + '/wp/menu/list-menu-by-restaurant/', {
              params: params
            });
          },
          //params is {openid: id, wp_openid: id}
          //while openid is for restaurant, wp_openid is for member
          'restaurant-cart': function(route_data, params) {
            return $http.get(
              config.api_url + '/wp/trade/get-cart-by-restaurant/' + route_data.table_id, {
              params: params
            });
          }
        }[resource];
      };
    }
  ]);

