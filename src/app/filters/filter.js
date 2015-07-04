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
          '0': '餐厅已确认，请等待上菜',
          '1': '实在抱歉，餐厅退回了订单'
        }[order_status_num + ''] || '';
      };
    }
  ]);

