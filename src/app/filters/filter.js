'use strict';

angular.module('dian')
  .filter('order_time', [
    function() {
      return function(order_time_utc) { //2015-03-21T00:00:00Z
        return extractTime(order_time_utc);

        function extractTime(utc_time) {
          return angular.isString(utc_time) ? utc_time.match(/T([^Z]*)Z/)[1] : '';
        }
      };
    }
  ])
  .filter('order_status', [

    function() {
      return function(order_status_num) {
        return {
          '0': '已下单',
          '1': '待付款',
          '2': '已付款',
          '3': '已取消'
        }[order_status_num + ''] || '未下单';
      };
    }
  ]);

